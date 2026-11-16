---
title: "S11 · flutter_dotenv documentation"
status: published
type: source
url: "https://pub.dev/documentation/flutter_dotenv/latest/"
organization: "pub.dev"
accessedAt: 2026-11-16
usedIn:
  - flutter-dotenv-config-and-secrets
  - public-repo-env-hygiene
---

套件文件。重點：.env 需在 pubspec.yaml 註冊為 asset 並在 main 內 load；文件明確警告不要在 .env 存放機密，因為 assets 會被打包進 App 且可被取出；不應提交的 .env 要加入 .gitignore。
