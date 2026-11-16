---
title: "單檔 Web 遊戲的架構取捨：資料、狀態與渲染分區"
slug: "single-file-web-game-architecture"
description: "以「懸疑推理社」的公開 README 為例，整理單一 HTML 檔如何用資料驅動、區塊分工與程式產生資源，換來零安裝與可攜性。"
status: published
category: "Web 與前端"
tags:
  - javascript
  - html
  - architecture
  - game
  - svg
  - web-audio
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - taica-puzzle-solving
  - reading-taica-single-file-design
sources:
  - title: "yueshung/TAICA-Puzzle_solving — README（技術說明）"
    url: "https://github.com/yueshung/TAICA-Puzzle_solving"
    organization: "GitHub"
    author: "yueshung"
    accessedAt: 2026-11-16
---

> 本文分成兩部分：**「README 描述」** 是可在來源中查證的事實；**「一般工程觀點」** 是整理者的判斷，不是該專案的官方說明。

## README 描述的設計

[懸疑推理社](/projects/taica-puzzle-solving/) 的 README 列出以下做法：

- 整個遊戲是單一 `index.html`（約 240 KB），HTML、CSS、JavaScript 內嵌，無外部函式庫
- 案件資料放在 `CASES`，新增案件時依既有結構新增一份資料並加入 `CASES`
- 程式在同一檔案內分區：`CASES`、`GAME_STATE`、`SCORING`、`ACTIONS`、`ART`、`SND`、`RENDER`
- 人物、場景、證物圖示與天氣效果由 JavaScript 產生 SVG
- 音效以 Web Audio 即時合成，沒有音檔
- 不發出網路請求，也不使用任何瀏覽器儲存，所以沒有存檔

## 一般工程觀點

### 為什麼「分區」比「分檔」更重要

單檔的最大風險是所有東西纏在一起。把「資料（CASES）→ 狀態（GAME_STATE）→ 規則（SCORING / ACTIONS）→ 表現（ART / SND / RENDER）」依方向分層，即使在同一檔，也能做到：新增內容只動資料區、調整評分只動規則區、換美術只動表現區。

### 取捨

| 得到 | 失去 |
|---|---|
| 零安裝、離線、可直接寄送或放進任何靜態空間 | 檔案變大後，編輯器內導覽與 code review 變困難 |
| 沒有依賴，也就沒有供應鏈與升級問題 | 沒有型別檢查與測試框架，需要自行驗證資料一致性 |
| 程式產生美術與音效，授權乾淨、體積小 | 美術迭代需要改程式，而不是換圖檔 |
| 無儲存，也就沒有隱私問題 | 玩家無法續玩 |

### 何時應該拆檔

當資料量（案件、證詞）持續成長、需要多人協作，或需要自動化測試時，把 `CASES` 拆成獨立 JSON 或模組、保留單檔輸出（以打包工具合併）是常見的折衷：開發時分檔，發佈時仍是一個 HTML。

延伸閱讀：[單檔設計閱讀筆記](/notes/reading-taica-single-file-design/)。
