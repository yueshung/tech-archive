// 共用工具：無相依套件的 Markdown / Frontmatter 讀取（只支援本專案使用的 YAML 子集）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const KINDS = ['projects', 'knowledge', 'notes'];
export const STATUSES = ['draft', 'review', 'published', 'archived'];
export const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function walk(dir, exts = ['.md']) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, exts));
    else if (exts.includes(path.extname(e.name))) out.push(p);
  }
  return out;
}

function scalar(raw) {
  let v = raw.trim();
  if (v === '') return '';
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === '[]') return [];
  if (v.startsWith('[') && v.endsWith(']')) return v.slice(1, -1).split(',').map((s) => scalar(s)).filter((s) => s !== '');
  return v;
}

export function parseFrontmatter(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text };
  const lines = m[1].split('\n');
  const data = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }
    const km = line.match(/^([A-Za-z0-9_]+):(?:\s+(.*))?$/);
    if (!km) throw new Error(`無法解析 Frontmatter 第 ${i + 1} 行：${line}`);
    const [, key, rest] = km;
    if (rest !== undefined && rest.trim() !== '') { data[key] = scalar(rest); i++; continue; }
    // 區塊：下一行起為 list
    i++;
    const items = [];
    while (i < lines.length && /^\s+-\s*/.test(lines[i])) {
      const first = lines[i].replace(/^\s+-\s*/, '');
      const om = first.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (om) {
        const obj = { [om[1]]: scalar(om[2]) };
        i++;
        while (i < lines.length && /^\s{3,}[A-Za-z0-9_]+:/.test(lines[i]) && !/^\s+-\s/.test(lines[i])) {
          const pm = lines[i].trim().match(/^([A-Za-z0-9_]+):\s*(.*)$/);
          obj[pm[1]] = scalar(pm[2]);
          i++;
        }
        items.push(obj);
      } else {
        items.push(scalar(first));
        i++;
      }
    }
    data[key] = items.length ? items : '';
  }
  return { data, body: m[2] };
}

export function loadContent() {
  const files = [];
  for (const kind of KINDS) {
    for (const file of walk(path.join(ROOT, 'src/content', kind))) {
      if (path.basename(file).startsWith('_')) continue;
      const text = fs.readFileSync(file, 'utf8');
      let parsed;
      try { parsed = parseFrontmatter(text); } catch (e) { parsed = { data: null, body: text, error: e.message }; }
      files.push({ kind, file, rel: path.relative(ROOT, file), ...parsed });
    }
  }
  return files;
}

export function loadWiki() {
  const dir = path.join(ROOT, 'wiki');
  return walk(dir).map((file) => {
    const text = fs.readFileSync(file, 'utf8');
    let parsed;
    try { parsed = parseFrontmatter(text); } catch (e) { parsed = { data: null, body: text, error: e.message }; }
    return { file, rel: path.relative(ROOT, file), ...parsed };
  });
}

export const isUrl = (s) => { try { const u = new URL(s); return u.protocol === 'https:' || u.protocol === 'http:'; } catch { return false; } };
export const validDate = (s) => {
  if (typeof s !== 'string' || !DATE_RE.test(s)) return false;
  const d = new Date(s + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s; // 排除 2026-02-30 這類不存在的日期
};
