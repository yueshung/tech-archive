---
title: "Astro 部署到 GitHub Pages：site、base 與 Actions"
slug: "github-pages-astro-deployment"
description: "Repository Pages 與自訂網域的 site／base 設定差異、官方 withastro/action 的權限與流程，以及子路徑下常見的連結問題。"
status: published
category: "工程實務"
tags:
  - astro
  - github-pages
  - ci-cd
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - astro-content-collections
  - pagefind-static-search
  - building-tech-archive-log
sources:
  - title: "Deploy your Astro Site to GitHub Pages"
    url: "https://docs.astro.build/en/guides/deploy/github/"
    organization: "Astro"
    accessedAt: 2026-11-16
  - title: "withastro/action"
    url: "https://github.com/withastro/action"
    organization: "Astro / GitHub"
    accessedAt: 2026-11-16
---

## 先決定網址型態

GitHub Pages 的網址有三種常見型態，Astro 的設定不同：

| 型態 | 範例 | `site` | `base` |
|---|---|---|---|
| Repository Pages | `https://<user>.github.io/<repo>/` | `https://<user>.github.io` | `/<repo>` |
| User／Organization Pages | `https://<user>.github.io/`（Repository 名稱為 `<user>.github.io`） | `https://<user>.github.io` | 不設定 |
| 自訂網域 | `https://example.com` | `https://example.com` | 不設定，並在 `public/CNAME` 寫入網域 |

官方文件特別提醒：使用自訂網域時**不要**設定 `base`；設定了 `base` 之後，所有內部連結都必須帶上該前綴，例如 `<a href="/my-repo/about">`。

## 官方 Action 的結構

Astro 官方維護 `withastro/action`，文件建議的 workflow 有兩個 job：

1. **build**：checkout → 安裝並建置（Action 會依 lockfile 自動偵測 npm、yarn、pnpm 或 bun）→ 上傳 Pages artifact
2. **deploy**：使用 `actions/deploy-pages` 部署

權限採最小必要原則：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

另外必須在 repository 的 **Settings → Pages** 把 Source 選為 **GitHub Actions**，否則部署不會生效。官方也建議把 package manager 產生的 lockfile 一併提交，Action 才能偵測並使用可重現的安裝。

## 子路徑下最常壞掉的地方

- 元件裡寫死 `/projects/`：在 `base` 為 `/tech-archive` 時會指向網域根目錄而 404
- 圖片、CSS、JS 與搜尋索引的路徑
- Sitemap、RSS 與 canonical URL 沒有帶 `base`
- 在 Markdown 內手寫 `/xxx/` 站內連結

本站的做法：

1. `astro.config.mjs` 從環境變數 `SITE_URL`、`BASE_PATH` 讀取；本機預設 `base: '/'`，CI 由 workflow 以 repository 名稱注入
2. 所有元件透過 `withBase()` 產生連結，不直接寫 `/` 開頭路徑
3. 一個小型 rehype plugin 會把 Markdown 內 `/` 開頭的連結與圖片自動補上 `base`，所以內容可以直接寫 `/projects/xxx/`
4. Sitemap、RSS、robots 都用 `withBase()` 與 `site` 組出完整網址

部署完成後，不能只看 build 成功：要用實際網址檢查首頁、內頁、搜尋、404 與瀏覽器 Console。這份清單在 Repository 的 `README.md` 部署章節。
