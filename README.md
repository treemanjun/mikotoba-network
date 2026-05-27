# みことばネットワーク — Word of God Network

各地の伝道者が発信するメディアをつなぐプラットフォームです。

## 公開手順（Vercel）

### ステップ1：GitHubにアップロード

1. https://github.com にアクセスしてログイン
2. 右上の「+」→「New repository」をクリック
3. Repository name に `mikotoba-network` と入力
4. 「Create repository」をクリック
5. このフォルダの中身をすべてアップロード

### ステップ2：Vercelで公開

1. https://vercel.com にアクセス
2. 「Sign up」→「Continue with GitHub」でログイン
3. 「Add New Project」をクリック
4. `mikotoba-network` を選択して「Import」
5. 何も変更せず「Deploy」をクリック
6. 数分でURLが発行されます（例：https://mikotoba-network.vercel.app）

### ステップ3：依頼者に送る

発行されたURLをそのまま送るだけです。

## ファイル構成

```
mikotoba-network/
├── public/
│   └── index.html         # HTMLのベース
├── src/
│   ├── index.js           # Reactの起動ファイル
│   └── MinistryPlatform.jsx  # メインのアプリ
├── package.json           # 設定ファイル
├── vercel.json            # Vercel設定
└── README.md              # この説明書
```

## 対応言語

- 🇯🇵 日本語
- 🇺🇸 English
- 🇰🇷 한국어
- 🇪🇸 Español
