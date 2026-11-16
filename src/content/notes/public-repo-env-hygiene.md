---
title: "筆記：公開 Repository 與 .env、logs 的處理順序"
slug: "public-repo-env-hygiene"
description: "一份通用檢查清單：.env、日誌與憑證在公開 Repository 中的風險，以及一旦提交過之後應該先做什麼。"
status: published
category: "工程實務"
tags:
  - security
  - flutter
createdAt: 2026-11-16
updatedAt: 2026-11-16
related:
  - flutter-dotenv-config-and-secrets
  - markdown-content-status-model
  - playtaiwan-front
  - mapmusic
sources:
  - title: "flutter_dotenv — pub.dev documentation"
    url: "https://pub.dev/documentation/flutter_dotenv/latest/"
    organization: "pub.dev"
    accessedAt: 2026-11-16
---

> 這是**通用的整理筆記**，不針對任何特定 Repository 下結論。

## 公開 Repository 的前提

公開代表：檔案、Commit、分支、Pull Request 與 Git 歷史都可被任何人讀取。刪掉檔案不會清除歷史。

## 檢查清單

1. **`.env` 與變體**（`.env.local`、`.env.staging`…）：是否在 `.gitignore` 中？如果必須提供範例，改提交 `.env.example`，內容只放假值。
2. **日誌與資料夾**：`logs/`、除錯輸出、匯出的資料檔，可能含帳號、IP、Token 或個資。
3. **打包進 App 的設定**：Flutter 的 `.env` 是 asset，會被打包進 App，所以**本來就不該放機密**（見 [flutter_dotenv 的邊界](/knowledge/flutter-dotenv-config-and-secrets/)）。
4. **圖片與素材**：授權與隱私（含截圖中的帳號、Token、位置）。

## 如果真的提交過

順序很重要：

1. **先撤銷或輪替憑證**（這一步讓外洩的值失效，是唯一可靠的補救）
2. 確認是否有被濫用的跡象
3. 再處理歷史（例如以專用工具重寫歷史並強制推送）——但已被 clone 或 fork 的副本仍可能保留舊內容
4. 補上 `.gitignore` 與 pre-commit 檢查

## 這個網站自己的做法

TECH ARCHIVE 的 AGENTS.md 明訂不得提交密碼、Token、API Key、個資與未授權素材；Public Repository 的草稿也被視為公開資料（見 [發布狀態模型](/knowledge/markdown-content-status-model/)）。

## 待確認

<span class="todo">待使用者確認：[PlayTaiwan-front](/projects/playtaiwan-front/) 與 [MapMusic](/projects/mapmusic/) 的 `.env` 與 `logs/` 是否含有不應公開的內容。本站沒有讀取這些檔案。</span>
