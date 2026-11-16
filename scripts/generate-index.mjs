// 內容盤點：輸出所有內容的 slug／狀態／分類／標籤對照表（Markdown），方便更新 wiki/INDEX.md 與檢查 related。
// 用法：npm run generate-index            → 輸出到終端機
//       npm run generate-index > inventory.md
import { loadContent } from './lib.mjs';
const rows = loadContent().filter((c) => c.data).sort((a, b) => a.kind.localeCompare(b.kind) || a.data.slug.localeCompare(b.data.slug));
console.log('| 類型 | slug | 狀態 | 分類 | 標籤 | related |');
console.log('|---|---|---|---|---|---|');
for (const c of rows) {
  const d = c.data;
  console.log(`| ${c.kind} | ${d.slug} | ${d.status} | ${d.category ?? ''} | ${(d.tags ?? []).join(', ')} | ${(d.related ?? []).join(', ')} |`);
}
