---
title: "閱讀筆記：PlayTaiwan 一個 App 如何容納三種角色"
slug: "reading-playtaiwan-front-roles"
description: "從 README 觀察 PlayTaiwan 的使用者、店家、管理後台三種角色，以及登入狀態與路由保護在這種設計中的位置。"
status: published
category: "行動應用"
tags:
  - flutter
  - architecture
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - playtaiwan-front
  - flutter-dotenv-config-and-secrets
sources:
  - title: "yueshung/PlayTaiwan-front — README"
    url: "https://github.com/yueshung/PlayTaiwan-front"
    organization: "GitHub"
    author: "yueshung"
    accessedAt: 2026-11-16
---

> 這是**閱讀筆記**：依公開 README 整理的觀察，不是個人開發紀錄。個人實際遇到的問題與解法請見文末待補區。

## 觀察到什麼

[PlayTaiwan](/projects/playtaiwan-front/) 的 README 把功能分成三組：

1. **一般使用者**：帳號、探索、收藏、影音、配對
2. **店家**：店家資料、AI 宣傳影音、檔案、題庫、優惠券
3. **管理後台**：帳號、故事、徽章管理與訪客分析

三種角色看到的畫面與可呼叫的 API 都不同，但共用同一個 Flutter 專案與同一套登入流程。

## 這種設計在意的事

README 提到登入狀態集中於 `AppSession`（管理 Token 與店家相關資料），並由 `AuthGuard` 協助登入保護。從這兩個名稱可以確認的是：**狀態只有一個來源**，守門邏輯與畫面分離。對多角色 App 而言，常見的關鍵問題是：

- 角色資訊從哪裡來、何時失效
- 沒有登入或角色不符時，要導向哪裡
- 登出時，哪些快取（Token、店家資料）需要清除

這些問題在 PlayTaiwan 中如何實作，**需要閱讀 `lib/` 程式碼才能回答**，目前尚未審閱，所以本筆記不做推論。

## 個人心得（待補充）

<span class="todo">待使用者補充：你實際處理過的登入／角色問題、除錯經過與學到的事。補上後，這篇會從「閱讀筆記」升級為「開發紀錄」。</span>
