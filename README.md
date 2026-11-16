# TECH ARCHIVE

**個人開發作品集 × 技術知識庫**

TECH ARCHIVE 是一個以 Markdown 為核心的靜態網站：把 GitHub 上的實作專案、技術文章、學習筆記與研究來源，整理成彼此連結、可以搜尋、來源可追溯的個人知識庫。

沒有 CMS、沒有登入後台。所有內容都是 Repository 裡的 `.md` 檔，直接在 GitHub 編輯、提交，之後由 GitHub Actions 自動驗證、建置並部署到 GitHub Pages。

🔗 線上網站：<https://yueshung.github.io/tech-archive/>

---

## 這個專案做了什麼

我在整理自己的作品時遇到的問題是：專案散落在各個 Repository，學到的技術散在筆記裡，彼此沒有關聯，也沒有一個能一次呈現的地方。TECH ARCHIVE 把它們放進同一個系統：

- **Projects**：以 Repository 的實際內容為依據，整理專案目標、功能、技術棧與架構
- **Knowledge**：解釋作品中實際用到的技術，例如 Astro Content Collections、Pagefind、flutter_dotenv
- **Notes**：閱讀專案、除錯與建置過程的紀錄
- **LLM Wiki**：研究過的外部來源，以自己的話整理成摘要並附上出處
- **Knowledge Graph**：把以上內容之間明確寫下的關聯畫成圖

## 網站內容

| 區域 | 說明 |
|---|---|
| **Home** | 精選作品、最近更新、各類內容統計 |
| **Projects** | 作品列表與篩選；每個作品含概覽、可驗證功能、技術棧、架構、Repository 連結與來源 |
| **Knowledge** | 技術文章，含分類、標籤、目錄（TOC）、程式碼複製、上一篇／下一篇、相關文章與 Backlinks |
| **Notes** | 學習、實驗與除錯紀錄 |
| **Graph** | 互動式知識關聯圖，節點為已發布內容，連線來自 `related` 欄位 |
| **LLM Wiki** | 主題索引、知識摘要與來源清單 |
| **About** | 個人介紹、作品中出現的技術與 GitHub 連結 |

另外提供：全文搜尋（Pagefind）、標籤頁、新增／編輯內容指南、RSS、Sitemap、`robots.txt` 與自訂 404 頁。

### 目前收錄的作品

| 作品 | 類型 | 技術 |
|---|---|---|
| **PlayTaiwan** | 臺灣旅遊解謎 App：故事任務、地圖導覽、收藏回憶，並有店家影音宣傳與管理後台 | Flutter、Dart |
| **懸疑推理社 MYSTERY FILES** | 單一 `index.html` 的推理視覺小說，美術與音效皆由程式即時產生 | HTML、JavaScript、SVG、Web Audio |
| **MapMusic** | 多頁式網頁專案 | HTML、CSS、JavaScript、PHP |
| **muse0621** | JavaScript 前端專案 | JavaScript |

## 技術棧

| 項目 | 選擇 |
|---|---|
| 框架 | [Astro](https://astro.build/) 6（Content Layer、靜態輸出） |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS 4 + Typography 外掛 |
| 內容 | Markdown + Zod Schema 驗證 |
| 搜尋 | [Pagefind](https://pagefind.app/)（建置後產生靜態索引，支援繁體中文） |
| 部署 | GitHub Actions + GitHub Pages |
| 驗證腳本 | 無相依套件的 Node `.mjs` 腳本 |
| 執行環境 | Node.js 22.12 以上 |

## 設計重點

**只發布 `published` 的內容。** 每篇內容的 Frontmatter 有 `status`（`draft` / `review` / `published` / `archived`）。建置階段就把非 `published` 的內容排除，不會產生頁面，也不會進入搜尋索引、Sitemap、RSS 與 Graph，而不是用 CSS 或前端條件隱藏。專案內附三份範例檔（draft、review、archived）專門用來驗證這個隔離。

**關聯只來自明確寫下的資料。** 內容之間的連結只來自 `related` 欄位，Backlinks 由資料反向計算，Graph 不做任何推測。

**來源可追溯。** 引用外部資料時以結構化格式記錄標題、網址、作者／組織與查閱日期；Wiki 以自己的話摘要，不複製原文。

**Project 頁區分證據等級。** 每個作品標示 `evidenceLevel`：`readme` 代表依 README 整理，`structure-only` 代表僅能確認目錄結構，內容不超出能驗證的範圍。

**部署路徑自動適應。** `site` 與 `base` 由環境變數決定；workflow 會依 Repository 名稱自動設定 `BASE_PATH`，Markdown 內以 `/projects/xxx/` 寫的站內連結在建置時會自動補上 base。

**編輯器與 CI 共用同一套規則。** 內容欄位同時由 Astro Schema、Markdown 範本與驗證腳本定義，提交時 CI 會檢查，格式錯誤會讓 workflow 失敗並阻止部署。

## 快速開始

```bash
git clone https://github.com/yueshung/tech-archive.git
cd tech-archive
npm install
npm run dev          # http://localhost:4321/
```

> 開發模式下搜尋索引不存在，搜尋頁會顯示提示，這是正常的。搜尋要在 build 之後才可用。

### 常用指令

| 指令 | 功能 |
|---|---|
| `npm run dev` | 啟動開發伺服器 |
| `npm run validate` | 驗證 Frontmatter、slug、related、來源格式，並掃描機密 |
| `npm run check-links` | 檢查 Markdown 站內連結 |
| `npm run build` | 完整建置：validate → check-links → Astro build → Pagefind → 輸出檢查 |
| `npm run preview` | 預覽建置結果（搜尋可用） |
| `npm run typecheck` | `astro check` 型別檢查 |
| `npm run generate-index` | 輸出所有內容的 slug／狀態／分類／標籤對照表，方便更新 Wiki 索引與檢查 `related` |

模擬 GitHub Pages 子路徑：

```bash
BASE_PATH=/tech-archive npm run build && BASE_PATH=/tech-archive npm run preview
```

PowerShell：`$env:BASE_PATH="/tech-archive"; npm run build`

## 新增與編輯內容

直接在 GitHub 網頁版操作即可：

| 動作 | 做法 |
|---|---|
| 新增 | 在 `src/content/projects/`、`knowledge/` 或 `notes/` 建立 `<slug>.md`，貼上 `templates/` 的對應範本 |
| 修改 | 開啟檔案、編輯、Commit |
| 發布 | 將 `status` 改為 `published` 並提交到 `main` |
| 撤回 | 將 `status` 改為 `draft` 或 `archived`，或刪除檔案 |
| 上傳圖片 | 放到 `public/images/{projects,knowledge,notes}/`，Markdown 寫 `![說明](/images/projects/xxx.png)` |

Frontmatter 規則：

- `slug` 為小寫 kebab-case，全站唯一，且必須與檔名相同
- `tags` 使用小寫 kebab-case
- `related` 填其他內容的 slug，且該 slug 必須存在
- 有引用外部資料就填 `sources`（`title`、`url` 必填）
- `githubUrl` / `demoUrl` 只填真實連結，沒有就整行刪除

每次提交後 GitHub Actions 會自動驗證；Pull Request 與非 `main` 分支只驗證不部署。

## 部署

1. 在 GitHub 建立 Public Repository 並推送程式碼（務必提交 `package-lock.json`）
2. **Settings → Pages**，Source 選 **GitHub Actions**
3. 推送到 `main`，*Deploy to GitHub Pages* 會自動執行

| 型態 | 設定 |
|---|---|
| Repository Pages（預設） | 不需修改，workflow 自動以 Repository 名稱設定 `BASE_PATH` |
| `<user>.github.io` Repository | 自動偵測，`BASE_PATH=/` |
| 自訂網域 | 修改 `deploy.yml` 的 `SITE_URL` 與 `BASE_PATH=/`，並新增 `public/CNAME` |

若部署分支不是 `main`，請修改 `.github/workflows/deploy.yml` 的 `branches`。

## 專案結構

```text
tech-archive/
├── AGENTS.md                 # AI 協作規則、內容規範與驗收標準
├── README.md
├── astro.config.mjs          # site / base 由環境變數決定
├── package.json
├── public/                   # favicon 與圖片（images/{projects,knowledge,notes}/）
├── src/
│   ├── content.config.ts     # Content Collections：projects / knowledge / notes / wiki
│   ├── components/           # Header、Footer、ProjectCard、ArticleCard、TableOfContents、
│   │                         # Backlinks、RelatedContent、SourceList、ListFilter …
│   ├── layouts/BaseLayout.astro
│   ├── pages/                # index、projects、knowledge、notes、tags、graph、wiki、
│   │                         # about、guide、search、404、rss.xml、sitemap.xml、robots.txt
│   ├── content/              # 網站內容（Markdown）
│   │   ├── projects/
│   │   ├── knowledge/
│   │   └── notes/
│   ├── data/site.ts          # 網站名稱、導覽、GitHub 設定
│   ├── styles/global.css
│   └── utils/                # content.ts、url.ts
├── wiki/                     # LLM Wiki：llm-wiki.md、INDEX.md、SOURCES.md、LOG.md、SOURCES/
├── templates/                # project / knowledge / note / source 範本
├── scripts/                  # validate-content、check-links、generate-index、check-dist
└── .github/workflows/        # deploy.yml（部署）、validate.yml（PR 與非 main 驗證）
```

## 內容流程

```
Capture → Distill → Connect → Draft → Review → Publish → Maintain
```

收集來源 → 以自己的話整理 → 建立關聯 → 撰寫 → 審核 → 發布（`status: published`）→ 持續維護。

專案開發也搭配 AI 協作：`AGENTS.md` 規範 AI 修改專案時的流程（Understand → Inspect → Plan → Change → Validate → Report）、內容品質規則與驗收標準。

## 安全與公開原則

這是 **Public Repository**。草稿、分支、Commit 與 Git 歷史都是公開的，不得提交：

- 密碼、Token、API Key、私鑰
- 個人敏感資料
- 未授權的圖片或素材

`npm run validate` 會掃描內容中的機密樣式。若憑證曾經提交，請先撤銷或輪替，再處理 Git 歷史。`.gitignore` 已排除 `.env`、`.env.*`（保留 `.env.example`）。

## 已知限制

- Pagefind 索引只在 `build` 後存在
- Knowledge Graph 使用自製的輕量力導向佈局，節點數達數百個時需要改用更強的演算法
- 使用系統字型，不載入外部字型
- Projects 的 `coverImage` 欄位已支援，但頁面目前尚未顯示封面圖

## 授權與內容來源

專案內容以 [github.com/yueshung](https://github.com/yueshung) 的公開 Repository 與官方技術文件為依據。外部來源皆以自己的話整理並附上出處，不複製原文。