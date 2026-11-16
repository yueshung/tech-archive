---
title: "懸疑推理社 MYSTERY FILES — 單檔推理視覺小說"
slug: "taica-puzzle-solving"
description: "單一 index.html 的懸疑推理視覺小說：兩宗完整案件、證據比對、時間線重建與最終指認，美術與音效皆由程式即時產生。"
status: published
category: "Web 與前端"
tags:
  - javascript
  - html
  - svg
  - web-audio
  - game
  - architecture
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - single-file-web-game-architecture
  - reading-taica-single-file-design
techStack:
  - HTML
  - CSS
  - JavaScript (Vanilla)
  - SVG
  - Web Audio API
githubUrl: "https://github.com/yueshung/TAICA-Puzzle_solving"
featured: true
projectType: "待使用者確認（個人／課程／團隊／競賽）"
evidenceLevel: readme
sources:
  - title: "yueshung/TAICA-Puzzle_solving — README"
    url: "https://github.com/yueshung/TAICA-Puzzle_solving"
    organization: "GitHub"
    author: "yueshung"
    accessedAt: 2026-11-16
---

## 專案概覽

「懸疑推理社 MYSTERY FILES」是一款**單檔**的懸疑推理視覺小說。玩家扮演推理社社長「霧島 澪」，在有限的行動點內調查現場、比對證詞、排列時間線，並在天亮前指認真兇。

README 強調：只有一個 `index.html`，開啟就能玩，不需要安裝、伺服器或網路。

## Repository 可驗證資訊

Repository 根目錄只有兩個檔案：`README.md` 與 `index.html`（共 6 個 commits，GitHub 語言標示為 HTML）。以下內容來自 2026-11-16 對 README 的檢視；**尚未逐行審閱 `index.html` 內的程式碼**。

## 遊戲內容（依 README）

| 案件 | 類型 | 難度 | 場景 |
|---|---|---|---|
| 霧鴉館 ‧ 暴風雨之夜 | 暴風雨夜的密室事件 | ★★★☆☆ | 書房、廚房、大廳 |
| 雪華亭 ‧ 雪夜足跡 | 雪夜溫泉旅館的足跡事件 | ★★★★☆ | 離れ書房、雪之中庭、主屋玄關 |

- 每案各有 5 名嫌疑人、15 件證物與十多則證詞
- **主動調查**：點擊場景物件找線索；首次取得證物消耗 1 點行動點，重看免費
- **證據比對**：選兩項證物或證詞，找出矛盾、支持或補充關係
- **時間線重建**：自行排列事件順序，系統說明哪裡前後衝突
- **質問**：用證物或證詞反駁嫌疑人
- **最終指認**：選擇犯人、動機、方法與關鍵證據，並確認時間線
- **四種結局**與結案分析；**100 分制評分**（推理、證據完整度、時間線、調查效率），等級 S～D
- **三階段提示**：需累積調查進度解鎖，不扣分
- 操作：空白鍵／Enter／→ 下一句、`A` 自動播放、`L` 對話回顧、`M` 音效開關、`Esc` 關閉面板

## 技術棧與架構

依 README「技術說明」：

- 單一 `index.html`（約 240 KB），HTML、CSS、JavaScript 全部內嵌，使用原生 JavaScript，**無外部函式庫**
- 13 名角色、9 種表情、雨雪天氣與停電效果，全部是 JavaScript 產生的**內嵌 SVG**
- 音效以 **Web Audio** 即時合成，不含音檔，可關閉
- 執行時不發出網路請求，不使用 localStorage、sessionStorage、IndexedDB 或 Cookie，因此**不提供存檔**
- 程式在同一檔案內分區：`CASES`（案件資料）、`GAME_STATE`、`SCORING`、`ACTIONS`、`ART`、`SND`、`RENDER`
- 新增案件時，依現有結構新增一份資料並加入 `CASES`

這種「資料與引擎分離、但仍在單一檔案」的設計，取捨整理在 [單檔 Web 遊戲的架構](/knowledge/single-file-web-game-architecture/) 與 [閱讀筆記](/notes/reading-taica-single-file-design/)。

## 個人負責範圍

<span class="todo">待使用者確認：劇本、美術、程式、測試分別由誰完成。</span>

README 的「原創聲明」寫明角色、劇情、美術與案件皆為原創，但沒有說明團隊成員。README 中的「線上遊玩」連結指向另一個 GitHub 帳號（`1111034009.github.io`），**本站無法確認該網址屬於你**，因此不在此頁顯示 Demo 連結。若確認為你的作品或團隊帳號，請在 Frontmatter 加入 `demoUrl`。

## 挑戰與實作重點

<span class="todo">待補充：開發過程中的難題（例如時間線衝突判定、證據關係設計、評分平衡）。需要你提供真實經驗或指定要審閱的程式區段。</span>

## 尚待補充

- 專案類型（社團作品？課程？競賽？）
- 確認 Demo 網址歸屬
- 遊戲截圖（請放入 `public/images/projects/`）
