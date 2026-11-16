// 內部連結檢查：檢查 Markdown 內容（src/content 與 wiki）中的站內連結、圖片與外部連結格式。
// 站內連結一律使用 /projects/<slug>/ 這種「/ 開頭、不含 base」的寫法，建置時會自動補上部署路徑。
import fs from 'node:fs';
import path from 'node:path';
import { loadContent, loadWiki, isUrl, ROOT } from './lib.mjs';

const content = loadContent();
const wiki = loadWiki();
const published = new Map(content.filter((c) => c.data?.status === 'published').map((c) => [c.data.slug, c]));
const allSlugs = new Map(content.filter((c) => c.data?.slug).map((c) => [c.data.slug, c]));
const tagSet = new Set([...published.values()].flatMap((c) => c.data.tags ?? []));
const STATIC = new Set(['/', '/projects/', '/knowledge/', '/notes/', '/graph/', '/wiki/', '/about/', '/search/', '/tags/', '/guide/', '/rss.xml', '/sitemap.xml', '/favicon.svg']);

const errors = [];
let checked = 0;

function check(rel, rawBody, isPublic) {
  // 程式碼區塊與行內程式碼中的範例連結不檢查
  const body = rawBody.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const links = [];
  for (const m of body.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) links.push(m[1]);
  for (const m of body.matchAll(/(?:href|src)="([^"]+)"/g)) links.push(m[1]);
  for (const raw of links) {
    checked++;
    if (raw.startsWith('#') || raw.startsWith('mailto:')) continue;
    if (/^https?:\/\//.test(raw)) { if (!isUrl(raw)) errors.push(`${rel}: 外部連結格式錯誤 ${raw}`); continue; }
    if (!raw.startsWith('/')) { errors.push(`${rel}: 站內連結請用 / 開頭的絕對寫法（例如 /projects/xxx/）：${raw}`); continue; }
    const p = raw.split('#')[0].split('?')[0];
    if (STATIC.has(p)) continue;
    let m;
    if ((m = p.match(/^\/(projects|knowledge|notes)\/([a-z0-9-]+)\/$/))) {
      const target = allSlugs.get(m[2]);
      if (!target || target.kind !== m[1]) errors.push(`${rel}: 連結目標不存在 ${raw}`);
      else if (isPublic && target.data.status !== 'published') errors.push(`${rel}: 已發布內容連到未發布的內容 ${raw}（status: ${target.data.status}）`);
      continue;
    }
    if ((m = p.match(/^\/tags\/([a-z0-9-]+)\/$/))) { if (!tagSet.has(m[1])) errors.push(`${rel}: 標籤頁不存在 ${raw}`); continue; }
    if (p.startsWith('/images/')) { if (!fs.existsSync(path.join(ROOT, 'public', p))) errors.push(`${rel}: 圖片不存在 public${p}`); continue; }
    errors.push(`${rel}: 無法辨識的站內連結 ${raw}`);
  }
}

for (const c of content) if (c.data) check(c.rel, c.body, c.data.status === 'published');
for (const w of wiki) if (w.data) check(w.rel, w.body, (w.data.status ?? 'published') === 'published');

if (errors.length) { errors.forEach((e) => console.error('錯誤  ' + e)); console.error(`\n連結檢查失敗：${errors.length} 個問題（共檢查 ${checked} 個連結）`); process.exit(1); }
console.log(`連結檢查通過：共檢查 ${checked} 個連結（Markdown 內容層級；建置後請再執行 npm run check-dist 檢查實際輸出）`);
