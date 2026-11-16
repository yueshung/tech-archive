---
title: "Pagefind：為靜態網站建立全文搜尋"
slug: "pagefind-static-search"
description: "Pagefind 在建置後掃描 HTML 產生靜態索引，如何用 data-pagefind-body 控制索引範圍，以及這與草稿隔離的關係。"
status: published
category: "Web 與前端"
tags:
  - pagefind
  - search
  - astro
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - astro-content-collections
  - markdown-content-status-model
  - github-pages-astro-deployment
sources:
  - title: "Running Pagefind"
    url: "https://pagefind.app/docs/running-pagefind/"
    organization: "Pagefind"
    accessedAt: 2026-11-16
  - title: "Configuring what content is indexed"
    url: "https://pagefind.app/docs/indexing/"
    organization: "Pagefind"
    accessedAt: 2026-11-16
  - title: "Pagefind CLI configuration options"
    url: "https://pagefind.app/docs/config-options/"
    organization: "Pagefind"
    accessedAt: 2026-11-16
---

## 運作方式

Pagefind 不是在執行時抓資料，而是在**網站建置完成之後**，讀取輸出的靜態 HTML 檔案，產生一組靜態搜尋索引。最小指令如下（`--site` 指向建置輸出資料夾）：

```bash
npx pagefind --site dist
```

執行後會在 `dist/pagefind/` 產生 search bundle，內含瀏覽器端的程式與索引分片。因為索引是建置產物，所以它**只在 build 之後存在**——`astro dev` 時搜尋頁會提示找不到索引，這是正常行為。

## 控制索引範圍

官方文件的規則：

- 預設從 `<body>` 開始索引
- 在主要內容元素加上 `data-pagefind-body` 可縮小範圍
- **只要網站任何一頁出現 `data-pagefind-body`，沒有此屬性的頁面就不會被索引**。因此最好的排除方式，就是只替要被搜尋的頁面加上它
- `data-pagefind-ignore` 可排除個別元素；`data-pagefind-meta` 可指定要隨結果回傳的 metadata（例如標題）

本站只在文章頁、Wiki 與 About 的主要內容加上 `data-pagefind-body`，列表頁、導覽與頁尾不會污染搜尋結果。

## 與草稿隔離的關係

AGENTS.md 要求 draft、review、archived 不得進入搜尋索引。Pagefind 讀的是**建置輸出**，所以只要草稿一開始就沒有被 Astro 產生成頁面，它自然不會被索引。這比「索引後再過濾」可靠得多：本站在 `npm run build` 的最後會執行 `scripts/check-dist.mjs`，掃描 `dist/` 確認非 published 內容沒有出現。

## 版本注意

官方 repository 的說明提到 Pagefind 1.5.0 引入新的 Component UI。本站沒有使用預設 UI，而是直接以瀏覽器端 JS API（`pagefind.js` 的 `search()`）自行渲染結果，以便套用 Editorial 風格並處理 `base` 路徑。升級 Pagefind 大版本時，請重新驗證搜尋頁。
