---
title: "TECH ARCHIVE LLM Wiki"
status: published
type: wiki
updatedAt: 2026-11-16
---

這份文件是 TECH ARCHIVE 的核心 Wiki：把研究過的來源，以自己的話整理成可連結的知識主題。**來源原文不會被複製到網站**，每個主題都附上來源代號（例如 `S01`），完整紀錄在下方的 Sources 區與 `wiki/SOURCES/`。

流程：Capture → Distill → Connect → Draft → Review → Publish → Maintain。目前處於「首次整理完成、等待使用者 Review」的階段。

## 概覽與讀法

- **證據等級**：`README` 代表已閱讀專案 README；`structure-only` 代表僅看到目錄結構。兩者都**尚未逐檔審閱程式碼**。
- **事實 vs 判斷**：Projects 頁區分「Repository 可驗證資訊」與「個人負責範圍」；後者在使用者確認前一律標示待確認。
- **連結規則**：Wiki 內的站內連結直接寫 `/projects/xxx/`，建置時會自動補上部署路徑。

## 主題 A：GitHub 專案研究

帳號 [github.com/yueshung](https://github.com/yueshung) 目前有 6 個公開 Repository（S01）。本次檢視其中 4 個：

| Repository | 語言標示 | 證據等級 | 站內頁面 |
|---|---|---|---|
| PlayTaiwan-front | Dart | README（S02） | [PlayTaiwan](/projects/playtaiwan-front/) |
| TAICA-Puzzle_solving | HTML | README（S03） | [懸疑推理社](/projects/taica-puzzle-solving/) |
| MapMusic | JavaScript | structure-only（S04） | [MapMusic](/projects/mapmusic/) |
| muse0621 | JavaScript | structure-only（S05） | [muse0621](/projects/muse0621/) |

另兩個公開 Repository（`sexy-front`、`Postpartum-Depression-Menu`）尚未檢視，列入待辦。

**整理結論**：兩個有 README 的專案都具備完整的功能描述；兩個沒有 README 的專案，只能確認目錄結構，因此刻意不擴寫。

## 主題 B：Astro 內容模型與部署

- Astro 6 移除舊版 Content Collections，必須使用 Content Layer（`loader`），設定檔位於 `src/content.config.ts`（S06）。詳見 [Astro Content Collections](/knowledge/astro-content-collections/)。
- 部署到 GitHub Pages 時，要先確認網址型態再設定 `site` 與 `base`；官方 Action 以最小權限完成 build 與 deploy（S07、S08）。詳見 [部署到 GitHub Pages](/knowledge/github-pages-astro-deployment/)。

## 主題 C：搜尋與發布隔離

- Pagefind 在建置後掃描 HTML 產生靜態索引；只要任何頁面使用 `data-pagefind-body`，沒有該屬性的頁面就不會被索引（S09、S10）。詳見 [Pagefind](/knowledge/pagefind-static-search/)。
- 因為索引來自建置輸出，只要草稿根本沒有被輸出成頁面，就不會被搜尋到。這是本站「資料層過濾」的設計理由，見 [發布狀態模型](/knowledge/markdown-content-status-model/)。

## 主題 D：Flutter 設定與機密

- `flutter_dotenv` 把 `.env` 當作 asset 載入；asset 會被打包進 App，所以不適合存放機密（S11）。詳見 [Flutter 設定與機密](/knowledge/flutter-dotenv-config-and-secrets/) 與 [公開 Repository 檢查清單](/notes/public-repo-env-hygiene/)。

## 主題 E：單檔 Web 遊戲設計

- 「懸疑推理社」以單一 HTML、內嵌 SVG 與即時合成音效達成零安裝（S03）。取捨整理見 [單檔 Web 遊戲的架構](/knowledge/single-file-web-game-architecture/)，推論性閱讀見 [閱讀筆記](/notes/reading-taica-single-file-design/)。

## 未解問題與待補資料

1. 四個專案的專案類型與個人負責範圍（全部待使用者確認）
2. MapMusic、muse0621 的用途與功能
3. 「懸疑推理社」README 中線上遊玩連結的歸屬
4. `sexy-front`、`Postpartum-Depression-Menu` 是否要納入作品集
5. Repository 最終名稱、部署分支與網址型態
