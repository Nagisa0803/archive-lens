# Archive Lens

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

IDOLY PRIDE のアカウントバックアップをブラウザー内で閲覧するツールです。英語・中国語・日本語・韓国語に対応し、初期言語は英語です。

**[ビューアーを開く](https://archive-lens.chiyoda-site.workers.dev/)** · **[使い方ガイド](https://archive-lens.chiyoda-site.workers.dev/guide/?lang=ja)** · **[取得ツールを入手](https://github.com/Nagisa0803/archive-bridge/releases)**

## ふたつのプロジェクト

[Archive Bridge](https://github.com/Nagisa0803/archive-bridge) は、自分のPCで許可した認証、読み取り専用の取得、ZIP出力を行います。[Archive Lens](https://github.com/Nagisa0803/archive-lens) は公開の静的ビューアーで、そのZIPをブラウザー内で読み込み・閲覧・再出力します。公開サイトにゲームパスワードを入力する必要はなく、取得用バックエンドも実行しません。

## 機能

- カード、キャラクター、編成、リソース、元データを閲覧。キャラクターから所持カード一覧、カードから詳細を表示。
- 衣装と追加ヘアの専用サムネイル。衣装デフォルトの記録を分け、顔画像で代用しません。
- ZIP / JSON のインポートとアカウントZIP出力。
- 写真URLをJSON・CSV・重複除去済みTXTで出力。同じアカウントのリンクJSONを追加可能。
- 検索付き8章のガイド、スマートフォン対応、読み込み済みデータを保持した4言語切り替え。
- ヘッダーのGitHubアイコンとフッターのリポジトリURL。

ゲーム内の名前と元データは翻訳・改変しません。表示言語の選択はURLで受け渡します。

## プライバシーと範囲

ファイルは現在のブラウザーだけで処理し、POST送信、localStorage、IndexedDB保存は行いません。ページ更新後は再インポートしてください。公開コードにアカウント、所持一覧、識別子、プライベート写真URL、ZIP、端末データ、パスワード、トークン、TLS鍵は含めません。

完全なUser/Getを保存しても、個別API、写真原画像、メッセージや電話の全履歴を取得した証明にはなりません。未取得画像は未取得として表示し、パスを推測しません。URL出力は画像ファイルの完全バックアップではなく、公式アカウントへの書き戻し機能もありません。

上限: ZIP 128 MiB、展開後合計128 MiB、各ファイル64 MiB。

## 開発・デプロイ

Node.js 22以上。npm依存パッケージのインストールは不要です。

```sh
npm run build
npm run dev
```

`http://127.0.0.1:8793/` と `/guide/` を開きます。`?lang=en`、`zh`、`ja`、`ko` に対応します。

公開URLは現在Cloudflare Workersの静的ホスティングです。Pagesの場合はNone、main、ビルド`npm run build`、出力`public`、秘密の環境変数なしで設定します。[DEPLOY.md](DEPLOY.md)を参照してください。共通画像は分割素材から再構築し、公開チェックで私有データや一般的な秘密情報を拒否します。

[取得ツール](https://github.com/Nagisa0803/archive-bridge) · [第三者表記](THIRD_PARTY_NOTICES.md)
