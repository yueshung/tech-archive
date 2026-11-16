import type { APIRoute } from 'astro';
import { getItems } from '../utils/content';
import { withBase } from '../utils/url';
import { SITE } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// 只輸出已發布內容
export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://example.invalid')).origin;
  const items = (await getItems()).slice(0, 30);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(SITE.name)}</title>
<link>${origin}${withBase('/')}</link>
<description>${esc(SITE.tagline)}</description>
<language>zh-Hant</language>
${items
  .map(
    (i) => `<item><title>${esc(i.title)}</title><link>${origin}${i.url}</link><guid>${origin}${i.url}</guid><pubDate>${i.updatedAt.toUTCString()}</pubDate><description>${esc(i.description)}</description></item>`
  )
  .join('\n')}
</channel></rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
