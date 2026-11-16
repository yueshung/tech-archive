---
title: "閱讀筆記：「懸疑推理社」把玩法寫成資料的幾個線索"
slug: "reading-taica-single-file-design"
description: "從 README 的玩法清單反推遊戲資料結構需要表達的東西：證物關係、證詞、時間線與評分。這是推論性的閱讀筆記，尚未對照程式碼。"
status: published
category: "Web 與前端"
tags:
  - game
  - javascript
  - architecture
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - taica-puzzle-solving
  - single-file-web-game-architecture
sources:
  - title: "yueshung/TAICA-Puzzle_solving — README"
    url: "https://github.com/yueshung/TAICA-Puzzle_solving"
    organization: "GitHub"
    author: "yueshung"
    accessedAt: 2026-11-16
---

> **重要：這篇的第二節是推論，不是對程式碼的描述。** 本站尚未審閱 `index.html`。

## README 明確寫了什麼

- 每案有 5 名嫌疑人、15 件證物、十多則證詞
- 玩家可以「選兩項證物或證詞，找出矛盾、支持或補充關係」
- 玩家排列時間線後，「系統會說明哪裡前後衝突」
- 最終指認要選犯人、動機、方法與關鍵證據
- 評分包含推理、證據完整度、時間線與調查效率
- 程式內有 `CASES`、`GAME_STATE`、`SCORING`、`ACTIONS` 等分區

## 推論：資料至少要能表達什麼（未驗證）

要讓上述玩法成立，案件資料至少需要回答這些問題。這是設計上的合理推測，**實際欄位名稱與結構未經驗證**：

1. 任意兩個證據之間的關係（矛盾／支持／補充）要存在哪裡？每對都存，還是只存有關係的？
2. 時間線的「正確順序」與「衝突原因」是資料，還是由規則計算出來？
3. 「首次取得證物消耗行動點、重看免費」需要在狀態裡記錄「已取得」。

## 想驗證時可以怎麼讀

<span class="todo">待使用者協助：指出 `CASES` 區段開始的位置，或貼上單一案件的資料結構（不含劇透也可），就能把推論換成實際描述，這篇會升級為正式的程式閱讀筆記。</span>
