# AGENTS.md — TECH ARCHIVE

## 1. 專案定位

TECH ARCHIVE 是一套以 Markdown 為核心的個人開發作品集與技術知識庫，以 Projects 為主要展示內容，並整合 GitHub 專案研究、網路技術資料、LLM Wiki 與 AI 協作開發流程。

**核心目標：**
- 優先整理並展示使用者 GitHub 上可公開的真實專案。
- 混合 GitHub 專案與可靠網路技術來源建立可追溯內容。
- 直接在 GitHub Repository 編輯 Markdown，管理內容新增、修改與刪除；不建立網站 CMS 或登入後台。
- 讓 AI Agent 能依照本文件持續新增、修改與維護專案。
- 將原始資料整理成可追溯、可連結的知識。
- 使用 GitHub Pages 發布靜態網站。

## 2. 已確認的技術與產品決策

| 項目 | 決策 |
|---|---|
| Repository | GitHub Public |
| 未發布草稿 | 可存在 Public Repository |
| 草稿保密性 | 不保密；不得放入敏感資料 |
| 公開網站 | 只顯示已發布內容 |
| 編輯方式 | 直接在 GitHub Repository 編輯 Markdown |
| AI 開發工具 | Claude 網頁版（由使用者複製提示詞、程式碼與檔案） |
| 前端框架 | Astro |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS |
| 內容格式 | Markdown / MDX |
| 網站 CMS | 不使用；不建立網站登入管理後台 |
| 後端服務 | 不建立網站 CMS、登入後台或 OAuth Worker |
| 搜尋 | Pagefind，實作時驗證相容性 |
| 部署 | GitHub Actions + GitHub Pages |
| 知識整理 | LLM Wiki |
| 初始內容重點 | Projects 優先；Knowledge 與 Notes 作為延伸內容 |

不得未經使用者同意任意更換以上主要技術或決策。

## 3. 開始任何任務前

先閱讀本文件與 `README.md`，再檢查相關程式碼、資料夾、內容模型與現有功能。

依任務閱讀 README 中對應章節。若專案後續新增其他規格文件，應優先遵守該文件並保持與本文件一致。

每次任務開始前：
1. 理解使用者要達成的結果與驗收期待。
2. 檢查目前實作，避免重複建立功能。
3. 確認會影響哪些頁面、資料模型、Markdown 欄位及部署流程。
4. 若資訊不足、需求互相衝突或涉及不可逆操作，先詢問使用者。
5. 修改前提出簡短計畫；小型明確修正可直接進行。
6. 以 Repository 的實際檔案、Git 狀態及測試結果判斷進度，不可把目標架構當成已存在的程式。

### AI 第一次接手專案時

第一次接手、切換 AI Agent，或無法確定目前進度時，必須先完成接手盤點，不可直接開始大量實作：

1. 閱讀 `AGENTS.md` 與 `README.md`。
2. 檢查 Repository 根目錄、現有檔案、Git branch 與未提交變更。
3. 檢查 `package.json`、lockfile、Node.js 套件管理方式、Astro 版本及現有 scripts。
4. 檢查已存在的頁面、元件、Content Collections、Markdown 內容與 GitHub Actions。
5. 對照本文件的開發階段與驗收條件，標記每項為「未開始／進行中／已完成／受阻」。
6. 已有實作先檢查、測試及沿用，不可為了符合建議目錄而盲目覆寫或重建。
7. 回報目前進度、發現的風險、缺少的決策，以及建議的下一個最小工作項目。
8. 若涉及 GitHub 帳號或 Repository 權限設定，說明需要使用者自行操作的步驟；不可要求使用者在聊天貼上密碼或 Token。

如果 Repository 尚未建立，將目前狀態視為「規格完成、實作尚未開始」，從 Phase 1 開始；若已有程式，必須先盤點後再決定從哪個階段接續。

## 4. 專案資訊架構

公開網站包含七個主要區域：

### Home
- 個人簡介與技術定位
- 精選 Projects 作為首頁主要內容
- 最近更新的作品與技術紀錄
- Knowledge、Notes 最新內容作為輔助區塊
- 專案技術領域摘要與內容統計

### Knowledge
- 技術文章列表
- 分類、標籤與全文搜尋
- 文章目錄（TOC）
- 程式碼複製
- 上一篇／下一篇
- 相關文章與 Backlinks

### Notes
- 學習過程
- 實驗紀錄
- 除錯紀錄
- 標籤與日期整理
- 與 Knowledge、Projects 的關聯

### Projects（主要內容區）
- 作品列表與篩選，首頁優先展示精選作品
- 專案背景、目標、技術棧、架構與已驗證功能
- 個人實際負責範圍、遇到的問題、解決方式與成果
- 開發過程、技術選擇及可延伸的改進方向
- GitHub URL、Demo URL（僅在確實存在且可公開時顯示）
- 優先整理使用者 GitHub 帳號 `yueshung` 的公開 Repository；每個 Repository 必須先檢查 README、目錄、程式碼與可用文件，不能只根據名稱推測功能

### Knowledge Graph
- 顯示文章、筆記間的明確關聯
- 點擊節點可開啟內容
- 顯示 Backlinks
- 不可憑空推測關係

### LLM Wiki
- 呈現 `wiki/llm-wiki.md` 中整理後、適合公開的知識內容
- 顯示主題索引、知識摘要與來源連結
- Wiki 來源原文不必全部複製到公開頁面，應以摘要及可追溯連結為主

### About
- 個人介紹
- 技術興趣與熟悉工具
- 學習方向
- GitHub 個人頁連結

必要互動包括搜尋、分類、標籤、文章目錄、程式碼複製、相關文章、Backlinks 與作品篩選。所有按鈕和控制項都必須有實際功能，不可製作假互動。

## 5. 建議資料夾結構

```text
tech-archive/
├── AGENTS.md
├── README.md
├── package.json              # npm；Astro ^6、Tailwind CSS 4、Pagefind
├── astro.config.mjs          # site / base 由 SITE_URL、BASE_PATH 環境變數決定
├── tsconfig.json
├── .nvmrc                    # Node 22
├── public/
│   ├── favicon.svg
│   └── images/{knowledge,notes,projects}/
├── src/
│   ├── content.config.ts     # Astro 6 Content Layer 設定（projects / knowledge / notes / wiki）
│   ├── components/           # Header、Footer、PageHeader、ProjectCard、ArticleCard、Tag、
│   │                         # TableOfContents、RelatedContent、Backlinks、Breadcrumbs、
│   │                         # SourceList、ListFilter、ContentPage
│   ├── layouts/BaseLayout.astro
│   ├── pages/                # index、projects、knowledge、notes、tags、graph、wiki、about、
│   │                         # search、404、sitemap.xml.ts、rss.xml.ts、robots.txt.ts
│   ├── content/{projects,knowledge,notes}/
│   ├── data/site.ts
│   ├── styles/global.css
│   └── utils/{content.ts,url.ts}
├── wiki/
│   ├── llm-wiki.md  INDEX.md  SOURCES.md  LOG.md
│   └── SOURCES/              # 一個來源一個檔案
├── templates/                # project / knowledge / note / source 範本
├── scripts/                  # 無相依套件的 Node 腳本（.mjs）
│   ├── lib.mjs  validate-content.mjs  check-links.mjs  generate-index.mjs  check-dist.mjs
└── .github/workflows/{deploy.yml,validate.yml}
```

上方為目前實際的目錄樹（腳本採 `.mjs`，讓未安裝依賴時也能執行內容驗證；原規劃的 `.ts` 名稱已改為 `.mjs`）。此專案不包含 `admin/` CMS 或 OAuth Worker；內容直接在 GitHub Repository 的 Markdown 檔案中管理。

**Astro 設定檔位置須依實際安裝版本確認。** 不可只因本範例列出 `src/content/config.ts` 就假設該路徑適用所有 Astro 版本；先檢查 Astro 版本及官方文件，再使用該版本支援的 Content Collections 設定方式（例如較新版本可能使用 `src/content.config.ts`）。**已確認：Astro 6 使用 `src/content.config.ts`**，目錄樹與 README 已同步。

## 6. 內容資料與格式

正式網站內容存放於 `src/content/`：
- `knowledge/`：整理完成、可供查閱的技術文章。
- `notes/`：學習、實驗、除錯與心得。
- `projects/`：真實作品與實作紀錄。

`wiki/` 是研究與知識整理工作區，保存來源與知識整理過程，不等於所有內容都要原封不動公開。`wiki/llm-wiki.md` 是整理後的核心 Wiki 文件，需在網站提供可閱讀的 LLM Wiki 頁面；來源經整理後，可轉寫至 Projects、Knowledge 或 Notes。

共通 Frontmatter 建議：

```yaml
---
title: "文章標題"
slug: "stable-kebab-case"
description: "簡短摘要"
status: draft
category: "分類"
tags:
  - example
createdAt: 2026-01-01
updatedAt: 2026-01-01
related: []
---
```

狀態定義：
- `draft`：草稿，不顯示於網站。
- `review`：等待審核，不顯示於網站。
- `published`：正式發布，顯示於網站。
- `archived`：封存，不顯示於網站。

Projects 可額外使用 `techStack`、`githubUrl`、`demoUrl`、`coverImage`、`featured`、`role`、`projectType` 等欄位。所有欄位必須由 Astro Schema、Markdown 範本與驗證腳本共同定義；本專案沒有 Decap CMS 設定。

### 三種內容的欄位基準

以下是欄位語意的基準，不代表每個欄位都必須無條件設為必填。實作 Schema 前，先檢查現有內容，再明確決定 required / optional、預設值及驗證方式；Astro Schema、Markdown 範本與驗證腳本的欄位名稱及型別必須一致。

| 欄位 | Knowledge | Notes | Projects |
|---|---|---|---|
| `title` | 必要 | 必要 | 必要 |
| `slug` | 必要且唯一 | 必要且唯一 | 必要且唯一 |
| `description` | 必要 | 必要 | 必要 |
| `status` | 必要 | 必要 | 必要 |
| `category` | 必要 | 可選 | 可選 |
| `tags` | 可選 | 可選 | 可選 |
| `createdAt` / `updatedAt` | 必要 | 必要 | 必要 |
| `related` | 可選，預設空陣列 | 可選，預設空陣列 | 可選，預設空陣列 |
| `sources` | 有引用時必須提供 | 有引用時必須提供 | 有引用時必須提供 |
| `techStack` | — | — | 必要或明確標示空陣列 |
| `githubUrl` / `demoUrl` | — | — | 可選；只填真實有效連結 |
| `coverImage` | — | — | 可選 |
| `featured` | — | — | 必要布林值，預設 `false` |
| `role` | — | — | 可選；只描述已確認的個人負責範圍 |
| `projectType` | — | — | 可選；例如個人、課程、團隊或競賽專案 |

補充規則：
- `slug` 是穩定識別字，不應因標題修改而自動改變；變更 slug 前檢查所有內部連結與關聯。
- `related` 儲存同一內容系統中其他文章的穩定 slug；建立 Backlinks 時由資料反向計算，不重複手動維護兩份關係。
- `sources` 使用結構化來源資料，至少包含 `title` 與 `url`；可取得時記錄 `author`、`organization`、`publishedAt`、`accessedAt`。沒有引用時使用空陣列。
- 日期統一使用 `YYYY-MM-DD`，時區及時間需求未確認前不要混用日期字串與 Unix timestamp。
- `githubUrl`、`demoUrl` 必須通過 URL 格式驗證；不存在時省略，不可填假連結或 placeholder。
- 圖片路徑需使用網站可解析的相對路徑或 Astro 支援方式；不可在程式中硬編碼本機絕對路徑。

### Frontmatter、GitHub 編輯與發布狀態的區別

本專案不使用 Decap CMS、網站登入後台或 OAuth Worker。內容管理直接透過 GitHub Repository 的 Markdown 檔案完成。

1. **Frontmatter `status`** 是網站內容的發布可見性欄位，只允許 `draft`、`review`、`published`、`archived`。
2. **GitHub 編輯／Commit** 是內容修改與版本紀錄；Commit 不代表文章已發布。
3. **Git 分支／Pull Request** 可作為版本審核方式，但不是網站 CMS 工作流程，也不代表文章已發布。
4. 網站只以合併至部署分支的內容及 Frontmatter `status: published` 作為公開輸出條件。

建議使用者直接在 GitHub 網頁版進入 `src/content/` 對應資料夾，新增、編輯或刪除 `.md` 檔案。修改合併至正式部署分支後，由 GitHub Actions 自動執行驗證、建置與部署。

刪除 Markdown 檔案只會讓新版本網站不再輸出該內容；Git 歷史仍可能保留舊內容。不得把刪除檔案視為機密資料清除方式。

### 內容品質規則

- 使用繁體中文，必要技術名詞保留英文。
- slug 使用唯一且穩定的小寫 kebab-case。
- 優先重用既有分類與標籤。
- related slug 必須存在。
- 引用外部來源時保留標題、URL、作者或組織、日期（可得時）與查閱日期。
- 用自己的話整理來源，不複製整篇文章。
- 區分已確認事實、個人心得與未驗證推論。
- 不得捏造使用者經歷、作品功能、完成度、數據或 Demo 連結。
- 不得將 AI 推測寫成使用者親自完成的成果；若個人負責範圍無法由使用者提供資訊或 Repository 證實，需標示「待使用者確認」或不寫。
- 可以採用一致的個人知識庫敘述風格，不必在每篇公開文章自動加上「AI 生成」或「非本人撰寫」標籤；但不得隱瞞外部來源、偽造親身經驗或把第三方成果歸為使用者所有。
- Projects 必須區分「專案客觀資訊」、「Repository 可驗證的技術實作」及「使用者個人負責範圍」。團隊／課程／競賽專案不得自動宣稱為使用者個人獨立完成。

### 初始內容與來源優先順序

初始內容以 Projects 為主，不以 Knowledge 或 Notes 篇數作為首要目標。

1. 第一優先：檢查 `https://github.com/yueshung` 中可公開的 Repository。
2. 第二優先：閱讀各 Repository 的 README、資料夾結構、主要程式碼、設定檔（排除機密）、公開文件與可取得的提交紀錄。
3. 第三優先：對照官方文件與可靠網路技術資料，補充專案使用的框架、語言、API 與架構知識。
4. 每個 Project 頁面至少包含專案目標、可驗證功能、技術棧、程式結構或架構、使用者實際負責範圍（未知時留白或標示待確認）、Repository 連結及來源。
5. 不以湊數為目的。初始作品數量依實際可確認的公開 Repository 決定；資料不足時列出待補欄位，不可虛構作品。
6. Knowledge 與 Notes 作為 Projects 的延伸內容，優先撰寫能解釋作品中實際使用技術的文章與開發紀錄。

## 7. GitHub Markdown 內容管理方式

本專案直接使用 GitHub Repository 管理 Markdown，不使用 Decap CMS、網站登入後台、GitHub OAuth Proxy 或 Cloudflare Worker。

### 使用者操作方式
- 新增文章：在 GitHub 對應的 `src/content/projects/`、`src/content/knowledge/` 或 `src/content/notes/` 建立新的 `.md` 檔案。
- 修改文章：直接編輯既有 Markdown 與 Frontmatter。
- 刪除文章：刪除對應 Markdown 檔案；確認新版本網站不再輸出該內容。
- 上傳圖片：將授權清楚且不含敏感資料的圖片放入 `public/images/projects/` 等對應資料夾，並在 Markdown 使用網站可解析的路徑。
- 發布文章：將 Frontmatter 的 `status` 設為 `published`，再將變更提交至正式部署分支。
- 撤回文章：將 `status` 改為 `draft` 或 `archived`，或移除檔案；注意 Git 歷史仍可能保留舊版本。

### AI 協作方式
使用者目前使用 Claude 網頁版，不使用 Claude Code。AI 需提供可直接複製的完整 Markdown 或完整檔案內容，並標示每個檔案的 Repository 相對路徑。使用者自行在 GitHub 網頁版建立、編輯、刪除與提交檔案。

AI 不可宣稱已直接修改 GitHub Repository，除非確實透過已授權工具完成並取得成功結果。AI 提供程式碼或 Markdown 後，必須由使用者貼入 GitHub，並由使用者確認 Commit。

### GitHub Actions
正式部署分支有新 Commit 時，GitHub Actions 執行內容驗證、Astro Build 與 GitHub Pages 部署。若驗證或建置失敗，workflow 必須失敗並阻止部署。

## 8. 公開 Repository 與安全政策

本專案 Repository 與未發布草稿皆為公開資料。草稿不顯示在網站，不代表原始 Markdown、圖片、分支、Pull Request 或 Git 歷史保密。

絕不可提交：
- 密碼、Token、API Key、OAuth Secret、私鑰。
- 個人敏感資料、私人聯絡資訊。
- 私人專案程式碼或不應公開的文件。
- 未獲授權的圖片、文字或其他素材。

若憑證曾經提交，即使刪除檔案仍可能存在 Git 歷史。必須先撤銷或輪替憑證，再處理歷史紀錄。

圖片存放於：
- `public/images/projects/`
- `public/images/knowledge/`
- `public/images/notes/`

上傳圖片前檢查授權、隱私、個資與檔案大小。

## 9. 正式發布規則

Astro 必須在建置階段只輸出 `status: published` 的內容。

Draft、Review、Archived 不可：
- 產生公開文章路由。
- 加入 Sitemap。
- 加入 Pagefind 搜尋索引。
- 加入公開 RSS / Feed。

不可只用 CSS、前端條件或隱藏連結來保護草稿。

正式流程：

`Capture → Distill → Connect → Draft → Review → Publish → Maintain`

正式分支更新後，GitHub Actions 執行內容驗證、建置與 GitHub Pages 部署。本專案沒有 OAuth Worker 或其他獨立後端服務。

### GitHub Pages 與 Astro 部署要求

- 先確認網站部署型態是 Repository Pages（例如 `https://<owner>.github.io/<repo>/`）或 User/Organization Pages／自訂網域，再設定 Astro `site` 與 `base`。
- Repository Pages 通常需要正確的 `base` 子路徑；自訂網域或根網域的設定不同。不可在未確認 Repository 名稱與網域前猜測最終值。
- 導覽、圖片、CSS、JS、Sitemap、RSS、canonical URL 及 Pagefind 資源都必須使用相容的部署路徑。避免在元件中散落硬編碼 `/` 開頭路徑。
- GitHub Actions 必須明確指定觸發分支、Node.js 版本、套件管理器與 lockfile，使用可重現的安裝方式（例如 `npm ci`，前提是使用 npm 且 lockfile 存在）。
- 建置／驗證失敗時必須讓 workflow 失敗，不得忽略錯誤後仍部署。
- 使用 GitHub Pages 官方支援的 Actions 部署流程與最小必要 `permissions`；不可把部署 Token 或其他 Secret 寫進 Repository。
- 若設定自訂網域，確認 `CNAME`、DNS、HTTPS 與 Astro `site` 一致；未設定前不得建立虛構網域。
- 驗收時使用實際部署網址檢查首頁、內頁、圖片、搜尋、404、Sitemap 與瀏覽器 Console，不可只以本機 `build` 成功判定部署完成。

## 10. Editorial 設計規範

視覺採現代技術雜誌風（Editorial）：
- 白色、暖米白、淺灰、近黑為主。
- 少量暖橘色作為強調。
- 大量合理留白，清楚的排版層級。
- 文章優先考量閱讀體驗。
- 避免過多漸層、陰影與裝飾動畫。
- 桌面優先，同時支援平板與手機。
- 可操作元素需有清楚的 Hover、Focus、Active 狀態。
- 支援鍵盤操作與合理色彩對比。
- 動畫克制，尊重 reduced-motion。

共用元件優先包含 Header、Footer、PageHeader、ArticleCard、ProjectCard、Tag、SearchInput、TableOfContents、CodeBlock、RelatedContent、Backlinks 與 Breadcrumbs。

## 11. AI 修改工作流程

每項任務依序執行：

`Understand → Inspect → Plan → Change → Validate → Report`

新增或修改內容：
1. 檢查是否已有相近文章或作品。
2. 使用統一格式與既有分類。
3. 建立或修改 Markdown。
4. 更新 related、索引、Backlinks 或 Graph 所需資料。
5. 確認 Markdown Frontmatter、Astro Schema、內容模板與驗證腳本一致。
6. 檢查來源、圖片與內部連結。
7. 執行內容驗證與建置。

修改資料模型時，必須同步檢查：
- Astro Content Collections Schema
- Markdown Frontmatter
- 內容模板
- 驗證腳本
- 相關頁面與元件

修改 UI 時，優先沿用既有元件與 Editorial 設計，不要重複造輪子或破壞內容格式。

不可任意：
- 更換主要技術。
- 新增資料庫或訪客會員系統。
- 增加非必要大型依賴。
- 重構無關程式。
- 修改內容 Schema 而不更新其他相依處。
- 自行發布未經確認的內容。

## 12. 開發階段與驗收標準

依序推進以下階段。可以因現有 Repository 狀態調整接續位置，但不可跳過安全前置條件，也不可把「檔案已建立」當成「功能已完成」。每個階段完成後更新進度紀錄（可先在 `README.md` 的狀態表更新），並回報測試證據。

| 階段 | 主要工作 | 最低驗收條件 |
|---|---|---|
| Phase 1：初始化 | 建立 Astro + TypeScript + Tailwind 專案、基本設定、scripts、目標目錄 | 套件可安裝；開發伺服器可啟動；production build 成功；README 與實際結構一致 |
| Phase 2：設計系統 | 建立全站 Layout、Header、Footer、色彩、字體、響應式規則及共用元件 | 桌面／手機可用；導覽可操作；鍵盤 focus 清楚；無明顯 Console error |
| Phase 3：主要頁面 | Home、Projects、Knowledge、Notes、Knowledge Graph、About、LLM Wiki | 七個區域皆可透過導覽到達；空資料與有資料狀態合理；連結不失效；不使用虛構個人資訊 |
| Phase 4：內容與知識功能 | Content Collections、Markdown/MDX、分類標籤、搜尋、TOC、related、Backlinks、Graph、Wiki | Schema 驗證通過；狀態過濾正確；搜尋與關聯可實際使用；草稿不進公開產物 |
| Phase 5：GitHub Markdown 工作流程 | 完成 Markdown 範本、GitHub 網頁版編輯指引、內容驗證與 Commit 後部署流程 | 可直接在 GitHub 新增、修改、刪除 Markdown；狀態過濾正確；不需要 CMS 或 OAuth |
| Phase 6：CI/CD 與部署 | GitHub Actions 驗證、Astro build、GitHub Pages 部署 | workflow 成功；實際網址頁面、資源、搜尋及路徑正常；失敗會阻止部署 |
| Phase 7：Projects 內容與 AI 規則驗收 | 優先整理 GitHub 專案作品集，再補充 Knowledge、Notes 與 LLM Wiki | Projects 內容以 Repository 證據為基礎；來源可追溯；AI 能遵守規則且不捏造個人經歷 |

### 每階段通用 Definition of Done

每個階段至少符合以下條件才可標記完成：
1. 需求與範圍已明確，沒有未解決的重大規格衝突。
2. 實際檔案已建立或修改，且沒有無關的大規模重構。
3. 主要使用流程可操作，不是只有靜態外觀或無作用按鈕。
4. 相關 lint、typecheck、內容驗證及 build 已執行；不適用項目需註明原因。
5. 手動測試項目記錄實際操作與結果；未測試不可標記通過。
6. 公開內容、草稿排除、路徑及 Secret 安全符合規範。
7. README 的進度、已知限制及下一步與 Repository 現況一致。

### 重要功能的驗收細節

- **內容發布：** 建立 draft、review、published、archived 各至少一筆測試內容；確認只有 published 產生公開頁面，且其他狀態不出現在 Sitemap、Pagefind、RSS／Feed、列表及 Graph。
- **搜尋：** 搜尋結果可開啟正確文章；草稿不可被搜尋；無結果時有明確提示；部署子路徑下資源仍正常。
- **Knowledge Graph：** 節點只來自已發布內容；邊只來自明確 `related` 關係；點擊節點可開啟正確頁面；空圖與孤立節點有合理呈現。
- **GitHub Markdown：** 使用者可在 GitHub 網頁版新增、編輯及刪除內容；Commit 後 Actions 驗證與部署正常；Frontmatter 狀態過濾正確。
- **部署：** 至少檢查首頁、七個主要區域、圖片、CSS/JS、搜尋、404、Sitemap、Console 及實際 base path。

## 13. 驗證與回報

依專案實際 scripts 執行適當檢查，不可假設命令名稱一定存在。先檢查 `package.json`，再執行可用命令；必要時新增明確 scripts。

最低檢查範圍：
- Lint（若已配置）
- TypeScript typecheck（若已配置）
- Frontmatter / Schema validation
- slug 唯一性檢查
- related slug 存在性檢查
- 內部連結檢查
- Astro production build
- Sitemap、RSS、搜尋索引的發布狀態檢查
- GitHub Pages base path 與資源路徑檢查
- GitHub Actions workflow 與分支觸發設定檢查

不得宣稱未執行的測試已通過。區分自動化測試、手動測試、尚未測試與受阻項目。

完成後以繁體中文回報：
1. 完成內容與對應階段。
2. 修改檔案。
3. 執行的驗證命令及實際結果。
4. 手動驗收結果（若有）。
5. 尚未完成、風險或需要使用者決定的事項。
6. 建議的下一個工作項目。

## 14. 開始實作前仍需確認的設定

以下資料尚未提供，不可猜測：
- GitHub Repository 最終名稱（暫定 `tech-archive`）。
- 正式部署分支名稱（預設候選為 `main`，實作時確認）。
- GitHub Pages 網址型態：Repository Pages、User/Organization Pages 或自訂網域。
- Repository 是否已建立，以及目前實際檔案與 Git 狀態。

GitHub 個人頁面來源：`https://github.com/yueshung`。

使用者不需要透過聊天提供 GitHub 密碼、Personal Access Token 或其他憑證。直接在 GitHub 網頁版編輯時，請使用者自行登入 GitHub；不可要求使用者將密碼或 Token 貼入 Claude 或 ChatGPT 對話。

## 15. 實作狀態與已知限制（首次交付，2026-11-16）

- 七個區域、Content Collections、搜尋、Graph、Wiki、範本、驗證腳本與 GitHub Actions 檔案皆已建立。
- **已實際執行**：`npm run validate`、`npm run check-links`（含負向測試）。
- **尚未執行**（交付環境無法連線 npm registry）：`npm install`、`astro build`、Pagefind 索引、`astro check`、瀏覽器手動驗收、GitHub Actions 實跑。在這些通過之前，不可宣稱 Phase 1–6 完成。
- `package-lock.json` 尚未產生；使用者需在本機 `npm install` 後提交。
- Projects 的專案類型、個人負責範圍皆為「待使用者確認」；MapMusic 與 muse0621 僅確認目錄結構（`evidenceLevel: structure-only`）。
- 新增 Frontmatter 欄位時，必須同步修改：`src/content.config.ts`、`scripts/validate-content.mjs`、`templates/`、相關元件。
