// 內容驗證：Frontmatter 欄位、slug 唯一與檔名一致、related 存在、來源格式、機密掃描、狀態分佈
// 與 src/content.config.ts 的 Zod schema 對應；修改欄位時必須兩邊同步（AGENTS.md §11）
import fs from 'node:fs';
import { loadContent, loadWiki, SLUG_RE, STATUSES, isUrl, validDate, ROOT, walk } from './lib.mjs';
import path from 'node:path';

const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

const content = loadContent();
const bySlug = new Map();
const EVIDENCE = ['readme', 'structure-only'];
const WIKI_TYPES = ['wiki', 'index', 'sources', 'source', 'log'];

for (const c of content) {
  const f = c.rel;
  if (c.error || !c.data) { err(f, c.error || '缺少 Frontmatter'); continue; }
  const d = c.data;
  for (const k of ['title', 'description']) if (typeof d[k] !== 'string' || !d[k].trim()) err(f, `${k} 必填`);
  if (typeof d.slug !== 'string' || !SLUG_RE.test(d.slug)) err(f, `slug 必須是小寫 kebab-case（目前：${d.slug}）`);
  else {
    if (bySlug.has(d.slug)) err(f, `slug 重複：${d.slug}（另見 ${bySlug.get(d.slug).rel}）`);
    bySlug.set(d.slug, c);
    if (path.basename(c.file, '.md') !== d.slug) err(f, `檔名必須與 slug 相同（${d.slug}.md）`);
  }
  if (!STATUSES.includes(d.status)) err(f, `status 必須是 ${STATUSES.join(' / ')}（目前：${d.status}）`);
  for (const k of ['createdAt', 'updatedAt']) if (!validDate(d[k])) err(f, `${k} 必須是 YYYY-MM-DD`);
  if (validDate(d.createdAt) && validDate(d.updatedAt) && d.updatedAt < d.createdAt) err(f, 'updatedAt 不可早於 createdAt');
  if (d.tags !== undefined && d.tags !== '' && !Array.isArray(d.tags)) err(f, 'tags 必須是陣列');
  for (const t of Array.isArray(d.tags) ? d.tags : []) if (!SLUG_RE.test(String(t))) err(f, `tag 必須是 kebab-case：${t}`);
  if (d.related !== undefined && d.related !== '' && !Array.isArray(d.related)) err(f, 'related 必須是陣列');
  const srcs = Array.isArray(d.sources) ? d.sources : [];
  for (const s of srcs) {
    if (typeof s !== 'object' || !s.title) err(f, 'sources 每筆需包含 title');
    else if (!isUrl(s.url)) err(f, `sources「${s.title}」的 url 無效`);
    for (const k of ['publishedAt', 'accessedAt']) if (s[k] && !validDate(s[k])) err(f, `sources「${s.title}」的 ${k} 必須是 YYYY-MM-DD`);
  }
  if (c.kind === 'knowledge' && (typeof d.category !== 'string' || !d.category.trim())) err(f, 'Knowledge 必須有 category');
  if (c.kind === 'projects') {
    if (!Array.isArray(d.techStack)) err(f, 'Projects 必須有 techStack（沒有請寫 techStack: []）');
    for (const k of ['githubUrl', 'demoUrl']) if (d[k] !== undefined && !isUrl(d[k])) err(f, `${k} 不是有效 URL（不存在請省略，不要填 placeholder）`);
    if (d.featured !== undefined && typeof d.featured !== 'boolean') err(f, 'featured 必須是 true / false');
    if (d.evidenceLevel !== undefined && !EVIDENCE.includes(d.evidenceLevel)) err(f, `evidenceLevel 必須是 ${EVIDENCE.join(' / ')}`);
    if (d.status === 'published' && /example\.com|your-|placeholder|todo-url/i.test(`${d.githubUrl ?? ''} ${d.demoUrl ?? ''}`)) err(f, 'githubUrl / demoUrl 看起來是 placeholder');
  }
  // 外部連結引用但沒有 sources → 警告
  if (d.status === 'published' && srcs.length === 0 && /\]\(https?:\/\//.test(c.body)) warn(f, '正文有外部連結但 sources 為空，請確認是否需要列為來源');
}

// related 檢查
for (const c of content) {
  if (!c.data || !Array.isArray(c.data.related)) continue;
  for (const r of c.data.related) {
    const t = bySlug.get(r);
    if (!t) err(c.rel, `related 指向不存在的 slug：${r}`);
    else if (c.data.status === 'published' && t.data?.status !== 'published') warn(c.rel, `related「${r}」未發布（${t.data?.status}），公開頁面不會顯示此關聯`);
    if (r === c.data.slug) err(c.rel, 'related 不可指向自己');
  }
}

// Wiki 檢查
const wiki = loadWiki();
for (const w of wiki) {
  const f = w.rel;
  if (w.error || !w.data) { err(f, w.error || '缺少 Frontmatter'); continue; }
  if (!w.data.title) err(f, 'title 必填');
  if (!WIKI_TYPES.includes(w.data.type)) err(f, `type 必須是 ${WIKI_TYPES.join(' / ')}`);
  if (w.data.status && !STATUSES.includes(w.data.status)) err(f, 'status 無效');
  if (w.data.type === 'source') {
    if (!isUrl(w.data.url)) err(f, '來源紀錄需要有效的 url');
    if (!validDate(w.data.accessedAt)) err(f, '來源紀錄需要 accessedAt（YYYY-MM-DD）');
    for (const u of Array.isArray(w.data.usedIn) ? w.data.usedIn : []) if (!bySlug.has(u)) err(f, `usedIn 指向不存在的 slug：${u}`);
  }
}
for (const need of ['wiki', 'index', 'sources', 'log']) if (!wiki.some((w) => w.data?.type === need)) err('wiki/', `缺少 type: ${need} 的文件`);
if (!wiki.some((w) => w.data?.type === 'source')) err('wiki/SOURCES/', '沒有任何來源紀錄');

// 機密掃描（公開 Repository 不可提交機密）
const SECRET_PATTERNS = [
  [/ghp_[A-Za-z0-9]{20,}/, 'GitHub Token'], [/github_pat_[A-Za-z0-9_]{20,}/, 'GitHub PAT'],
  [/AKIA[0-9A-Z]{16}/, 'AWS Access Key'], [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, '私鑰'],
  [/sk-[A-Za-z0-9]{32,}/, 'API Key'], [/(api[_-]?key|secret|password|token)\s*[:=]\s*["']?[A-Za-z0-9_\-]{16,}/i, '疑似憑證'],
];
const scanFiles = [...walk(path.join(ROOT, 'src'), ['.md', '.astro', '.ts', '.css']), ...walk(path.join(ROOT, 'wiki')), ...walk(path.join(ROOT, 'templates')), ...walk(path.join(ROOT, '.github'), ['.yml'])];
for (const file of scanFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const [re, name] of SECRET_PATTERNS) if (re.test(text)) err(path.relative(ROOT, file), `疑似含有 ${name}，請移除並輪替該憑證`);
}
if (fs.existsSync(path.join(ROOT, '.env'))) err('.env', '專案根目錄不應存在 .env（已被 .gitignore 排除，但請確認未提交）');

// 統計
const stat = {};
for (const c of content) { const k = `${c.kind}:${c.data?.status ?? '?'}`; stat[k] = (stat[k] ?? 0) + 1; }
const pub = content.filter((c) => c.data?.status === 'published');
const tags = new Set(pub.flatMap((c) => c.data.tags ?? []));
const cats = new Set(pub.map((c) => c.data.category).filter(Boolean));
const srcSet = new Set(pub.flatMap((c) => (Array.isArray(c.data.sources) ? c.data.sources : []).map((s) => s.url)));

console.log('— 內容統計（已發布）—');
for (const k of ['projects', 'knowledge', 'notes']) console.log(`  ${k}: ${pub.filter((c) => c.kind === k).length} 篇（全部狀態 ${content.filter((c) => c.kind === k).length}）`);
console.log(`  分類 ${cats.size}、標籤 ${tags.size}、來源 URL ${srcSet.size}、Wiki 文件 ${wiki.length}（來源紀錄 ${wiki.filter((w) => w.data?.type === 'source').length}）`);
console.log('  狀態分佈：', JSON.stringify(stat));
for (const s of STATUSES) if (!content.some((c) => c.data?.status === s)) warn('content', `沒有 status: ${s} 的測試內容（發布隔離驗收需各至少一筆）`);

warnings.forEach((w) => console.warn('警告  ' + w));
if (errors.length) {
  errors.forEach((e) => console.error('錯誤  ' + e));
  console.error(`\n內容驗證失敗：${errors.length} 個錯誤、${warnings.length} 個警告`);
  process.exit(1);
}
console.log(`\n內容驗證通過：0 個錯誤、${warnings.length} 個警告`);
