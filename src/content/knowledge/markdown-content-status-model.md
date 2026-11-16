---
title: "Markdown 內容與發布狀態模型：draft、review、published、archived"
slug: "markdown-content-status-model"
description: "為什麼本站用 Frontmatter status 控制可見性、為什麼 Public Repository 的草稿並不保密，以及 slug、related 與 Backlinks 的設計規則。"
status: published
category: "工程實務"
tags:
  - markdown
  - content-model
  - security
  - architecture
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - astro-content-collections
  - pagefind-static-search
  - public-repo-env-hygiene
sources: []
---

> 本文描述的是 TECH ARCHIVE 自己的設計規範（見 Repository 的 `AGENTS.md`），不是外部標準。

## 四種狀態

| status | 意義 | 輸出到網站 |
|---|---|---|
| `draft` | 草稿 | 否 |
| `review` | 等待人工確認 | 否 |
| `published` | 正式發布 | 是 |
| `archived` | 封存 | 否 |

只有「已合併到部署分支」且「`status: published`」的內容才會被公開。Commit 或 Pull Request 本身**不等於發布**。

## 為什麼在資料層過濾

不用 CSS 或前端條件隱藏草稿。`getItems()` 在讀取內容時就過濾，所以非 published 內容不會產生路由，也就不會出現在 Sitemap、RSS、Pagefind 索引、列表與 Knowledge Graph。再加上 `check-dist` 腳本在 build 後掃描 `dist/`，形成第二道檢查。

## 草稿不是機密

Repository 是 Public。草稿、分支、Commit、Pull Request 與 Git 歷史都可能被任何人讀取。因此：

- 不要在草稿裡放密碼、Token、個資或未授權素材
- 刪除檔案只是讓新版本網站不再輸出，舊版本仍在 Git 歷史
- 若憑證曾被提交，**先撤銷或輪替**，再處理歷史

## slug、related 與 Backlinks

- `slug` 是穩定 ID（小寫 kebab-case、全站唯一），不會因標題改變而自動變動；變更前要檢查所有 `related` 與內部連結
- `related` 只在一篇文章裡寫「我指向誰」；**Backlinks 由資料反向計算**，不需要手動維護兩份
- Knowledge Graph 的邊只來自 `related`，不做相似度推測
- `related` 指到不存在的 slug 是建置錯誤；指到「存在但未發布」的 slug 只會警告，且該連結不會在公開頁面顯示
