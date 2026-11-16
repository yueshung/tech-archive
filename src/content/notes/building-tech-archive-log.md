---
title: "開發紀錄：TECH ARCHIVE 網站的建置決策"
slug: "building-tech-archive-log"
description: "這個網站本身的設計決策：Astro 6、Content Layer、發布狀態過濾、base path、Pagefind 與驗證腳本。並誠實記錄哪些尚未在實機驗證。"
status: published
category: "工程實務"
tags:
  - astro
  - tailwind
  - github-pages
  - pagefind
  - ci-cd
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - astro-content-collections
  - github-pages-astro-deployment
  - pagefind-static-search
  - markdown-content-status-model
sources:
  - title: "Deploy your Astro Site to GitHub Pages"
    url: "https://docs.astro.build/en/guides/deploy/github/"
    organization: "Astro"
    accessedAt: 2026-11-16
---

> 這份紀錄由 AI 協作產生初版。**其中「已驗證」與「尚未驗證」的區分是故意寫清楚的**：請在你第一次成功建置與部署後更新。

## 決策

| 主題 | 決策 | 原因 |
|---|---|---|
| 框架 | Astro 6 + TypeScript | 專案規範指定；內容導向、輸出純靜態 |
| 內容 | Content Layer + glob loader，設定在 `src/content.config.ts` | Astro 6 已移除舊版 API |
| 樣式 | Tailwind CSS 4（Vite plugin）+ 少量自訂 CSS | 規範指定；字體只用系統字型，無外部請求 |
| 搜尋 | Pagefind CLI（postbuild）+ 自製搜尋頁 | 純靜態；自行處理 `base` 路徑 |
| 發布過濾 | `getItems()` 在資料層過濾 `published` | 草稿不產生路由、索引或 Graph |
| 路徑 | `withBase()` + rehype 補 base + `BASE_PATH` 環境變數 | 同一份程式支援本機與子路徑部署 |
| 驗證 | 無相依套件的 Node 腳本（`.mjs`） | 沒安裝依賴也能先驗證內容 |
| 部署 | 官方 `withastro/action` + GitHub Pages | 官方建議的流程，權限最小化 |

## 已驗證 vs 尚未驗證

**已驗證**（建置前，在沒有網路的環境中執行）：Markdown frontmatter 結構、slug 唯一、related 指向存在、內容內部連結、狀態分佈。

**尚未驗證**（需要你本機 `npm install` 後執行）：`astro build`、TypeScript 型別檢查、Pagefind 索引、實際頁面的視覺與互動、GitHub Actions 實跑。

## 待你更新

<span class="todo">首次成功建置後，請在此補上：實際遇到的錯誤、修正方式與部署網址。</span>
