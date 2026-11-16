---
title: "PlayTaiwan — 臺灣旅遊解謎 Flutter App"
slug: "playtaiwan-front"
description: "以臺灣旅遊探索為主題的 Flutter 應用程式：結合故事任務、地圖導覽、收藏與回憶，並提供店家影音宣傳與管理後台介面。"
status: published
category: "行動應用"
tags:
  - flutter
  - dart
  - architecture
  - security
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - flutter-dotenv-config-and-secrets
  - reading-playtaiwan-front-roles
  - public-repo-env-hygiene
techStack:
  - Flutter
  - Dart
  - Material Design
  - HTTP API
  - flutter_dotenv
  - audioplayers
githubUrl: "https://github.com/yueshung/PlayTaiwan-front"
featured: true
projectType: "待使用者確認（個人／課程／團隊／競賽）"
evidenceLevel: readme
sources:
  - title: "yueshung/PlayTaiwan-front — README 與目錄結構"
    url: "https://github.com/yueshung/PlayTaiwan-front"
    organization: "GitHub"
    author: "yueshung"
    accessedAt: 2026-11-16
---

## 專案概覽

PLAYTAIWAN 是一款以臺灣旅遊探索為主題的 Flutter 應用程式。依 README 的說明，它把「旅遊地點探索、故事任務、地圖導覽、收藏與回憶」與「店家影音宣傳、後台管理」放在同一個產品裡：使用者透過故事與任務探索地方，店家則管理店家資料、題庫、優惠券與宣傳影音。

README 的副標語是：一場帶你用 App 解謎遊玩，並輸出專屬紀錄短影音的旅遊體驗。

## Repository 可驗證資訊

以下內容來自 2026-11-16 對公開 Repository 首頁與 README 的檢視。**尚未逐檔審閱 `lib/` 內的程式碼**，因此架構描述以 README 明文為準。

| 項目 | 內容 |
|---|---|
| 主要語言 | Dart（GitHub 語言標示） |
| 預設分支 | `main`，共 91 個 commits |
| 平台資料夾 | `android`、`ios`、`web`、`linux`、`macos`、`windows`（Flutter 標準多平台結構） |
| 其他資料夾 | `lib`、`assets`、`img`、`test` |
| 設定檔 | `pubspec.yaml`、`pubspec.lock`、`analysis_options.yaml` |
| 語系 | README 指出預設為繁體中文 `zh_TW` |
| 字體 | 源流明體（GenRyuMin），來源為 ButTaiwan/genryu-font |

## 功能（依 README）

### 一般使用者

- 帳號功能：登入、註冊、帳號資料與密碼相關操作
- 旅遊探索：依地點與偏好探索，生成故事劇本式旅遊
- 收藏與回顧：收藏、徽章、過往故事紀錄與相關媒體
- 明信片與影音：瀏覽故事明信片，查看或下載 Vlog 影片
- 配對功能：配對加入與配對大廳頁面

### 店家

- 店家註冊與資料管理
- AI 宣傳影音：輸入生成資料、查看進度、檢查與瀏覽結果
- 檔案管理：最近生成與歷史檔案
- 題庫管理：新增、編輯玩家任務題目
- 優惠券管理

### 管理後台

- 帳號管理（查詢、建立、修改、刪除）
- 故事管理、徽章管理
- 訪客分析儀表板與策略對話介面

> 以上為 README 所列功能。哪些已完整實作、哪些仍在開發，需要由你確認；本頁不宣稱任何完成度。

## 技術棧與架構

README 的「技術架構」段落明確提到：

- **Flutter / Dart** 作為開發框架，**Material Design** 作為 UI
- 以 HTTP 與**後端 API** 溝通（後端不在這個 Repository 內，名稱為 `-front`）
- 使用 `flutter_dotenv` 讀取 `.env` 設定
- 登入狀態集中於 `AppSession`（管理 Token 與店家相關資料），並由 `AuthGuard` 協助登入保護
- 以 `audioplayers` 搭配 `BgmService` 管理音訊與背景音樂

這是一個典型的「單一 App、多角色入口」設計：同一份 Flutter 程式碼同時服務一般使用者、店家與管理者，因此登入狀態與路由保護是關鍵。相關閱讀筆記見 [PlayTaiwan 的三種角色](/notes/reading-playtaiwan-front-roles/)。

## 個人負責範圍

<span class="todo">待使用者確認：你在此專案中實際負責的模組（例如哪些畫面、API 串接、登入流程、影音功能）。</span>

目前 Repository 顯示有 2 個 forks 與 1 個 Pull Request，但這不足以判斷分工；在你確認前，本站**不會**把整個專案描述為個人獨立完成。

## 挑戰與實作重點

<span class="todo">待補充：開發中遇到的問題、解法與取捨。需要你提供真實經驗，或在後續 review 時指定要深入閱讀的檔案。</span>

可由 Repository 驗證、值得後續深入的方向：

1. `AppSession` / `AuthGuard` 如何在多角色之間切換與保護路由
2. 影音生成「進度查詢」的呈現方式（輪詢或其他機制）
3. `.env` 的使用與公開 Repository 的處理方式，見 [Flutter 設定與機密](/knowledge/flutter-dotenv-config-and-secrets/)

## 尚待補充

- Demo 連結（沒有可公開的 Demo 前不顯示）
- 專案類型與你的角色
- 螢幕截圖（請放入 `public/images/projects/`，並確認授權與隱私）
