---
title: "Astro Content Collections：以 Markdown 管理內容"
slug: "astro-content-collections"
description: "Astro 6 的 Content Layer 如何以 glob loader 與 Zod schema 管理 Markdown，以及本站如何在這之上做發布狀態過濾。"
status: published
category: "Web 與前端"
tags:
  - astro
  - markdown
  - content-model
  - typescript
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - markdown-content-status-model
  - github-pages-astro-deployment
  - pagefind-static-search
sources:
  - title: "Upgrade to Astro v6"
    url: "https://docs.astro.build/zh-tw/guides/upgrade-to/v6/"
    organization: "Astro"
    accessedAt: 2026-11-16
  - title: "Upgrade to Astro v5（Content Layer 遷移說明）"
    url: "https://v6.docs.astro.build/zh-cn/guides/upgrade-to/v5"
    organization: "Astro"
    accessedAt: 2026-11-16
---

## 為什麼要知道這件事

本站的所有文章都是 Markdown，Astro 的 Content Collections 是把「一堆 `.md` 檔」變成「有型別、可驗證的資料」的機制。更重要的是：**Astro 6 移除了舊版 Collections API**，網路上許多 v2～v4 時代的教學不能直接照抄。

## Astro 6 的重點變更

依官方升級指南整理：

- Astro 6 完全移除了舊版內容集合（legacy collections）支援，包含 `legacy.collections` 旗標，以及 Astro 5 時未經旗標也能運作的向下相容行為。
- 所有集合都必須使用 Astro 5 引入的 **Content Layer API**，也就是每個集合都要有 `loader`。
- 設定檔必須放在 **`src/content.config.ts`**，舊位置 `src/content/config.ts` 會觸發 `LegacyContentConfigError`。
- 內建 `glob()` loader 負責指定 `base`（資料夾）與 `pattern`（檔名樣式）。
- Zod 升級到 4，建議從 `astro/zod` 匯入 `z`；舊的 `astro:content` 內 `z` 匯出已被標為棄用。
- 升級指南的錯誤對照指出：`entry.slug` 應改用 `entry.id`，需要檔名時使用 `entry.filePath`。
- Astro 6 需要較新的 Node.js；依升級資料為 22.12.0 以上，本站以此為準（請以官方文件為最終依據）。

## 最小範例

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['draft', 'review', 'published', 'archived']),
    updatedAt: z.coerce.date(),
  }),
});

export const collections = { notes };
```

頁面內以 `getCollection()` 取得資料、以 `render(entry)` 取得可輸出的 `<Content />` 與 `headings`（用來做 TOC）。

## 本站的用法

1. 三個內容集合（projects、knowledge、notes）共用同一組基礎欄位，Projects 另有 `techStack`、`githubUrl` 等欄位。
2. 另有一個 `wiki` 集合，以 glob 讀取 repository 根目錄的 `wiki/`，讓 LLM Wiki 頁面可以直接渲染 Markdown。
3. **所有頁面只透過 `getItems()` 取資料**，它在 `getCollection()` 的 filter 就排除非 `published` 的項目。這樣草稿根本不會進入路由、列表、Graph、Sitemap 或 Pagefind 索引，而不是「先取得再用 CSS 隱藏」。
4. Schema 同時是文章格式的規格：欄位寫錯時，建置會直接報錯，而不是默默顯示壞頁面。

這套發布狀態模型的設計理由見 [Markdown 內容與發布狀態模型](/knowledge/markdown-content-status-model/)；部署時的路徑問題見 [Astro 部署到 GitHub Pages](/knowledge/github-pages-astro-deployment/)。
