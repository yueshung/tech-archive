// 建置後檢查（npm run build 最後一步，也可單獨執行：npm run check-dist）
// 1) 非 published 內容沒有輸出頁面、沒有出現在 Sitemap / RSS / 搜尋索引 / Graph
// 2) 七個主要區域與已發布內容都有輸出
// 3) 所有 / 開頭的內部連結都帶有正確的 base 並指向存在的檔案
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { loadContent, ROOT, walk } from './lib.mjs';

const dist = path.join(ROOT, 'dist');
if (!fs.existsSync(dist)) { console.error('找不到 dist/，請先執行 astro build'); process.exit(1); }
const rawBase = process.env.BASE_PATH || '/';
const base = rawBase === '/' ? '' : '/' + rawBase.replace(/^\/+|\/+$/g, '');
const errors = [];
const content = loadContent();
const pub = content.filter((c) => c.data?.status === 'published');
const hidden = content.filter((c) => c.data && c.data.status !== 'published');
const exists = (p) => fs.existsSync(path.join(dist, p));

// 1. 非 published
for (const h of hidden) {
  if (exists(`${h.kind}/${h.data.slug}`)) errors.push(`非 published 內容產生了頁面：${h.kind}/${h.data.slug}（${h.data.status}）`);
}
const textFiles = walk(dist, ['.html', '.xml', '.txt', '.json']);
for (const file of textFiles) {
  const t = fs.readFileSync(file, 'utf8');
  for (const h of hidden) {
    if (t.includes(`/${h.kind}/${h.data.slug}/`) || t.includes(h.data.title)) errors.push(`非 published 內容「${h.data.slug}」出現在 ${path.relative(dist, file)}`);
  }
  if (/_SENTINEL_9f3a/.test(t)) errors.push(`偵測到測試關鍵字殘留於 ${path.relative(dist, file)}`);
}
// Pagefind 片段（gzip 壓縮）：解壓後檢查
const pfDir = path.join(dist, 'pagefind');
if (!fs.existsSync(pfDir)) errors.push('找不到 dist/pagefind/（Pagefind 索引未產生）');
else {
  for (const file of walk(pfDir, ['.pf_fragment', '.pf_index', '.pf_meta'])) {
    let buf = fs.readFileSync(file);
    try { buf = zlib.gunzipSync(buf); } catch { /* 非 gzip 則維持原樣 */ }
    const t = buf.toString('utf8');
    if (/_SENTINEL_9f3a/.test(t)) errors.push(`搜尋索引含有非 published 測試關鍵字：${path.relative(dist, file)}`);
    for (const h of hidden) if (t.includes(`/${h.kind}/${h.data.slug}/`)) errors.push(`搜尋索引含有非 published 內容：${h.data.slug}`);
  }
}

// 2. 應該存在的頁面
const must = ['index.html', 'projects/index.html', 'knowledge/index.html', 'notes/index.html', 'graph/index.html', 'wiki/index.html', 'about/index.html', 'search/index.html', 'tags/index.html', 'guide/index.html', '404.html', 'sitemap.xml', 'rss.xml', 'robots.txt'];
for (const m of must) if (!exists(m)) errors.push(`缺少輸出：${m}`);
for (const p of pub) if (!exists(`${p.kind}/${p.data.slug}/index.html`)) errors.push(`已發布內容缺少頁面：${p.kind}/${p.data.slug}`);
if (exists('sitemap.xml')) {
  const sm = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
  for (const p of pub) if (!sm.includes(`/${p.kind}/${p.data.slug}/`)) errors.push(`Sitemap 缺少 ${p.data.slug}`);
}

// 3. 內部連結與 base
let linkCount = 0;
for (const file of walk(dist, ['.html'])) {
  // 程式碼區塊與行內程式碼中的範例連結不算真正的連結
  const html = fs.readFileSync(file, 'utf8').replace(/<pre[\s\S]*?<\/pre>/g, '').replace(/<code[\s\S]*?<\/code>/g, '');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^"]*"/g)) {
    const url = m[1];
    if (url.startsWith('//')) continue;
    linkCount++;
    if (base && !(url === base || url.startsWith(base + '/'))) { errors.push(`${path.relative(dist, file)}: 內部連結沒有 base 前綴 ${url}`); continue; }
    const rel = decodeURIComponent(url.slice(base.length)).replace(/^\//, '');
    const cand = [rel, path.join(rel, 'index.html'), rel + '.html'];
    if (!cand.some((c) => exists(c) && (fs.statSync(path.join(dist, c)).isFile()))) errors.push(`${path.relative(dist, file)}: 連結目標不存在 ${url}`);
  }
}

if (errors.length) {
  [...new Set(errors)].slice(0, 60).forEach((e) => console.error('錯誤  ' + e));
  console.error(`\n建置輸出檢查失敗：${new Set(errors).size} 個問題`);
  process.exit(1);
}
console.log(`建置輸出檢查通過：${pub.length} 篇已發布內容皆有頁面；${hidden.length} 篇非 published 內容未出現在頁面、Sitemap 或搜尋索引；檢查了 ${linkCount} 個內部連結（base="${base || '/'}"）。`);
