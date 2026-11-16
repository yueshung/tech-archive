// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * 部署設定（AGENTS.md §9）
 * - SITE_URL：網站網址，預設為使用者 GitHub Pages 的暫定值
 * - BASE_PATH：Repository Pages 的子路徑，例如 /tech-archive；本機開發預設為 /
 * GitHub Actions 會自動以 Repository 名稱設定 BASE_PATH，見 .github/workflows/deploy.yml
 * 使用自訂網域或 <user>.github.io 根網域時，請不要設定 BASE_PATH。
 */
const site = process.env.SITE_URL || 'https://yueshung.github.io';
const rawBase = process.env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : '/' + rawBase.replace(/^\/+|\/+$/g, '');

/** 在 Markdown 內以 /projects/xxx/ 撰寫站內連結時，自動補上 base 路徑 */
function rehypeBaseLinks() {
  const prefix = base === '/' ? '' : base;
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element' && prefix) {
      for (const attr of ['href', 'src']) {
        const v = node.properties?.[attr];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) {
          node.properties[attr] = prefix + v;
        }
      }
    }
    if (node.children) node.children.forEach(walk);
  };
  return (/** @type {any} */ tree) => walk(tree);
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
    shikiConfig: { theme: 'github-light', wrap: false },
  },
  vite: { plugins: [tailwindcss()] },
});
