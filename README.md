# TECH ARCHIVE

**Personal Developer Portfolio & Technical Knowledge Archive**

以 Markdown 為核心的個人開發作品集與技術知識庫。內容直接在 GitHub 編輯 Markdown，沒有 CMS、沒有登入後台。

> AI 協作規則、內容欄位、安全原則與驗收標準以 [`AGENTS.md`](./AGENTS.md) 為準。

## 目前狀態（請先讀）

| 階段 | 內容 | 狀態 |
|---|---|---|
| Phase 1 | Astro 6 + TypeScript + Tailwind 4 專案結構 | 檔案已建立；**尚未 `npm install` / build 驗證** |
| Phase 2 | Editorial 設計系統、Layout、共用元件 | 檔案已建立；**尚未目視驗收** |
| Phase 3 | Home、Projects、Knowledge、Notes、Graph、LLM Wiki、About、Search、Tags、404 | 檔案已建立；**尚未目視驗收** |
| Phase 4 | Schema、搜尋、分類／標籤、TOC、Backlinks、Graph、Wiki | 程式已寫；Schema 規則已由驗證腳本檢查；**Astro Schema 與 Pagefind 尚未實跑** |
| Phase 5 | 範本、內容驗證、GitHub 編輯流程 | 已完成並實際執行驗證腳本（含負向測試） |
| Phase 6 | GitHub Actions + Pages | workflow 已寫；**尚未在 GitHub 實跑** |
| Phase 7 | Projects / Knowledge / Notes / Wiki 內容 | 初版完成；**待使用者 Review** |

**已實際執行並通過：** `npm run validate`、`npm run check-links`。
**尚未執行（交付環境無法連線 npm）：** `npm install`、`astro build`、Pagefind、`astro check`、瀏覽器檢查、GitHub Actions。第一次在你的電腦跑時可能需要小幅修正，請把錯誤訊息貼回來。

## 疑難排解

- **`Missing field tsconfigPaths ... @tailwindcss/vite`**：npm 自動裝了 Vite 8，與 `@tailwindcss/vite` 不相容。本專案已在 `package.json` 固定 `vite ^7.3.2`；若仍出現，刪除 `node_modules` 與 `package-lock.json` 後重新 `npm install`。
- **`markdown.rehypePlugins ... deprecated` 警告**：Astro 新版對 Markdown 外掛設定方式的提醒，目前不影響建置。

## 本機安裝與啟動

需求：**Node.js 22.12 以上**（Astro 6 要求）、npm。

```bash
unzip TECH_ARCHIVE.zip && cd tech-archive
npm install            # 會產生 package-lock.json，請務必提交到 GitHub
npm run dev            # http://localhost:4321/  （開發模式，搜尋索引不存在是正常的）
```

驗證與完整建置（建議第一次就跑）：

```bash
npm run validate       # Frontmatter、slug、related、來源、機密掃描（不需安裝依賴）
npm run check-links    # Markdown 內部連結
npm run build          # validate → check-links → astro build → Pagefind → check-dist
npm run preview        # 預覽建置結果，這時搜尋才可用
npm run typecheck      # astro check（首次會詢問是否安裝 @astrojs/check）
```

模擬 GitHub Pages 子路徑：`BASE_PATH=/tech-archive npm run build && BASE_PATH=/tech-archive npm run preview`（Windows PowerShell：`$env:BASE_PATH="/tech-archive"; npm run build`）。

## 內容管理（GitHub 網頁版）

| 動作 | 做法 |
|---|---|
| 新增 | 在 `src/content/projects/`、`knowledge/` 或 `notes/` 點 **Add file → Create new file**，檔名 `<slug>.md`，貼上 `templates/` 對應範本 |
| 修改 | 開啟檔案點鉛筆圖示編輯，Commit |
| 刪除 | 開啟檔案 → 右上 `⋯` → Delete file → Commit（Git 歷史仍會保留） |
| 發布 | 將 Frontmatter 的 `status` 改為 `published` 並提交到 `main` |
| 撤回 | `status` 改為 `draft` / `archived`，或刪除檔案 |
| 上傳圖片 | 放到 `public/images/projects/`（或 knowledge / notes），Markdown 寫 `![說明](/images/projects/xxx.png)` |

規則重點：

- `slug` 小寫 kebab-case、**全站唯一、檔名必須相同**（`my-note.md` → `slug: "my-note"`）
- `status` 只有 `draft` / `review` / `published` / `archived`；**只有 `published` 會出現在網站、搜尋、Sitemap、RSS、Graph**
- 站內連結寫 `/projects/<slug>/`、`/knowledge/<slug>/`、`/notes/<slug>/`（建置時自動補 base）
- `related` 填其他內容的 slug；Backlinks 自動反向計算
- 有引用外部資料就填 `sources`（`title`、`url` 必填）
- `githubUrl` / `demoUrl` 只填真實連結，沒有就整行刪除
- 不確定的個人資訊（`role`、專案類型）寫「待使用者確認」，**不要編造**
- 每次提交後 GitHub Actions 會自動驗證；格式錯誤會讓 workflow 失敗並阻止部署，錯誤訊息會指出檔案與原因

> **Public Repository 提醒：** 草稿、分支、Commit、PR 與 Git 歷史都是公開的。不得提交密碼、Token、API Key、個資或未授權素材。

## 上傳到 GitHub 並部署到 GitHub Pages

1. 在 GitHub 建立新的 **Public** Repository（建議名稱 `tech-archive`；不要勾選 README / .gitignore）。
2. 在專案資料夾執行（先確認已跑過 `npm install`，且 `package-lock.json` 存在）：
   ```bash
   git init -b main
   git add .
   git commit -m "Initial TECH ARCHIVE"
   git remote add origin https://github.com/yueshung/tech-archive.git
   git push -u origin main
   ```
   不想用指令：也可以在 GitHub 網頁版 **Add file → Upload files** 拖入整個資料夾內容（注意 `.github/` 與 `.gitignore` 是隱藏檔，要一併上傳；不要上傳 `node_modules`、`dist`）。
3. 進入 Repository **Settings → Pages**，**Source 選 GitHub Actions**。
4. 回到 **Actions** 分頁，等待 *Deploy to GitHub Pages* 完成（也可手動 Run workflow）。
5. 網址通常是 `https://yueshung.github.io/tech-archive/`。

網址型態與設定：

| 型態 | 設定 |
|---|---|
| Repository Pages（預設） | 不用改，workflow 會自動以 Repository 名稱設定 `BASE_PATH` |
| `yueshung.github.io` Repository | 自動偵測，`BASE_PATH=/` |
| 自訂網域 | 改 `deploy.yml` 的 `SITE_URL=https://你的網域`、`BASE_PATH=/`，並新增 `public/CNAME`（內容只有網域一行） |

若主要分支不是 `main`，修改 `.github/workflows/deploy.yml` 的 `branches`。

**部署後驗收清單**（請用實際網址，不要只看 build 成功）：首頁、七個導覽區域、任一 Project／Knowledge／Note 內頁、圖片與 CSS、搜尋（搜「Flutter」）、故意輸入錯誤網址看 404、`/sitemap.xml` 不含草稿、瀏覽器 Console 無錯誤。

## 專案結構

見 [`AGENTS.md`](./AGENTS.md) §5（與實際結構一致）。

## 技術決策（已確認）

Astro 6 + TypeScript、Tailwind CSS 4、Markdown、Pagefind、GitHub Actions + GitHub Pages、`AGENTS.md` 規範、LLM Wiki。**不使用** Decap CMS、登入後台或 OAuth Worker。

## 初始內容與來源原則

- Projects 優先；來源為 [github.com/yueshung](https://github.com/yueshung) 的公開 Repository 與官方文件
- 區分「可驗證的專案事實」、「個人負責範圍」與「一般技術知識」；未確認者標示待使用者確認
- 不捏造經歷、功能、數據或 Demo；不在每篇文章加「AI 生成」標籤，但保留真實來源
- Wiki 以摘要與連結為主，遵守來源授權

## 尚待你補充／確認

1. **全部 4 個作品的專案類型與個人負責範圍**（目前顯示「待使用者確認」）
2. **MapMusic、muse0621**：沒有 README，只確認目錄結構；請提供用途、功能、你的角色，或改為 `archived`
3. **懸疑推理社 README 的線上遊玩網址**指向另一個帳號（`1111034009.github.io`），歸屬待確認；確認後在 Frontmatter 加 `demoUrl`
4. **PlayTaiwan-front 根目錄有 `.env` 檔案**（出現在公開檔案列表）。本站沒有讀取其內容；請你自行確認是否含金鑰，若有請先**撤銷／輪替**。MapMusic 的 `logs/` 也請確認
5. About 頁的個人簡介、熟悉工具、學習方向（目前為待補充）
6. `sexy-front`（Vue）、`Postpartum-Depression-Menu`（Python）兩個公開 Repository 尚未整理，是否納入作品集
7. Repository 最終名稱、部署分支、網址型態
8. 首次成功建置後，更新 `notes/building-tech-archive-log` 的「已驗證」段落
9. 範例草稿檔（`sample-draft/review/archived-note`）用於驗證隔離，可保留或刪除

## 已知限制

- Pagefind 搜尋索引只在 `build` 後存在，`npm run dev` 時搜尋頁會顯示提示
- Knowledge Graph 為自製輕量力導向佈局（無外部圖形函式庫），節點很多時（數百）需改用更強的演算法
- 字型使用系統字型，不載入外部字型
- 尚未提供圖片資源：Projects 沒有封面圖（`coverImage` 欄位已支援，但頁面目前未顯示封面）
