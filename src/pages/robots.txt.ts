import type { APIRoute } from 'astro';
import { withBase } from '../utils/url';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://example.invalid')).origin;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}${withBase('/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
