import type { APIRoute } from 'astro';
import { getItems } from '../utils/content';
import { withBase } from '../utils/url';

// 只列出已發布內容（草稿 / review / archived 不會進入 Sitemap）
export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://example.invalid')).origin;
  const items = await getItems();
  const staticPaths = ['/', '/projects/', '/knowledge/', '/notes/', '/graph/', '/wiki/', '/about/', '/search/', '/tags/', '/guide/'];
  const urls = [
    ...staticPaths.map((p) => ({ loc: origin + withBase(p), lastmod: undefined as string | undefined })),
    ...items.map((i) => ({ loc: origin + i.url, lastmod: i.updatedAt.toISOString().slice(0, 10) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
