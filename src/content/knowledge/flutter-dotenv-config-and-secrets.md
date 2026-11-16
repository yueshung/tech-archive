---
title: "Flutter 的 .env 設定與機密：flutter_dotenv 的邊界"
slug: "flutter-dotenv-config-and-secrets"
description: "flutter_dotenv 把 .env 當成 asset 載入；因為 asset 會被打包進 App，.env 適合放設定，不適合放機密。"
status: published
category: "行動應用"
tags:
  - flutter
  - dart
  - security
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - playtaiwan-front
  - public-repo-env-hygiene
sources:
  - title: "flutter_dotenv — pub.dev documentation"
    url: "https://pub.dev/documentation/flutter_dotenv/latest/"
    organization: "pub.dev"
    accessedAt: 2026-11-16
---

## 它在做什麼

`flutter_dotenv` 讓 Flutter App 在啟動時讀取 `.env` 檔，之後用 `dotenv.env['KEY']` 或 `dotenv.get('KEY')` 取值。使用步驟（依套件文件）：

1. 在專案根目錄建立 `.env`
2. 在 `pubspec.yaml` 的 `flutter: assets:` 註冊該檔案
3. 在 `main()` 內 `await dotenv.load()`，之後才能使用

文件也提醒：不要在最上層（top-level）初始化器內讀取，因為那會早於 `main()` 執行；請在函式、widget 或回呼裡讀取。

## 重點：它是 asset，會進入 App

套件文件的安全提醒很直接：**不要把 API key、token、密碼放在 `.env`**，因為 Flutter 的 assets 會被打包進 App 二進位檔，任何拿到建置產物的人都有辦法取出。

這代表 `.env` 在 Flutter 裡的角色是「環境設定」（例如 API base URL、功能開關），不是「保險箱」。需要真正保密的憑證，應放在伺服器端，由後端代為呼叫第三方服務。

## 與版本控制的關係

文件另外建議：如果 `.env` 不應被提交，要把它（及 `.env.staging` 等變體）加入 `.gitignore`。這是**第二道**獨立的問題——就算不進 Git，打包後仍可被取出；就算只放不敏感設定，公開 Repository 也應確認內容。

## 在 PlayTaiwan 的脈絡

[PlayTaiwan](/projects/playtaiwan-front/) 的 README 說明專案以 `flutter_dotenv` 讀取 `.env`，並以 HTTP 呼叫後端 API。若 `.env` 內只有 API 位址等非機密設定，風險有限；若曾放入金鑰，請參考 [公開 Repository 與 .env](/notes/public-repo-env-hygiene/) 的處理順序。
