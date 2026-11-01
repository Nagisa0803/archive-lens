export const GUIDE_COPY={
  "en": {
    "brand": "User guide",
    "directory": "Guide contents",
    "search": "Search the guide",
    "searchHint": "Try: export, mobile, photos",
    "open": "Open viewer ↗",
    "hero": "From backup to browsing,<br>one step at a time.",
    "lead": "Archive Bridge collects locally. Archive Lens helps you explore and export the saved results.",
    "empty": "No matching sections. Try another keyword.",
    "matches": " matching sections",
    "footer": "Coverage depends on what your archive actually contains.",
    "back": "Back to viewer",
    "sections": [
      [
        "start",
        "Start here",
        "<div class=\"path-grid\"><a class=\"path\" href=\"#first-backup\"><span class=\"path-icon pale\">＋</span><h3>I need my first backup</h3><p>Download Archive Bridge and create an archive on your own computer.</p><strong>Get a backup →</strong></a><a class=\"path\" href=\"#import\"><span class=\"path-icon\">ZIP</span><h3>I already have a ZIP</h3><p>Import your saved archive and browse cards, characters, teams and resources.</p><strong>Import a backup →</strong></a></div><div class=\"note\"><b>Two tools, separate responsibilities</b><p><a href=\"https://github.com/Nagisa0803/archive-bridge\">Archive Bridge</a> runs locally and performs authorized authentication and collection. This public viewer processes ZIPs in your browser; it never asks for a game password or uploads your archive.</p></div>"
      ],
      [
        "first-backup",
        "Create your first backup",
        "<ol class=\"steps\"><li><h3>Download the matching Archive Bridge release</h3><p>Open <a href=\"https://github.com/Nagisa0803/archive-bridge/releases\">Archive Bridge releases</a>, choose the package for your operating system and architecture, and extract it. Platform support and known limitations are documented in the collector repository.</p></li><li><h3>Start the local collector</h3><p>Run the application on your computer and open the local address it displays. Choose an output folder. If setup asks for a supported game APK, select your own installation package; no APK is included in these repositories.</p></li><li><h3>Sign in using your own game account</h3><p>Configure account linking in the game first. Enter the ID and password only into your trusted local collector, review its scope, and explicitly start collection. Never put credentials in GitHub Issues, chat, or this public viewer.</p></li><li><h3>Wait for completion and save the ZIP</h3><p>A configured password alone is not a backup. Wait for the collector to finish, inspect its coverage summary, and save the resulting ZIP. Keep the original copy, then import it into Archive Lens.</p></li></ol>"
      ],
      [
        "import",
        "Import and explore",
        "<ol class=\"steps\"><li><h3>Select Import backup</h3><p>Choose an account ZIP, a snapshot JSON, or a complete User/Get JSON. On desktop, you can also drag the file into the dialog. A photo-links JSON is a supplement and belongs in the Photos page.</p></li><li><h3>Wait for the success message</h3><p>The browser supports a ZIP up to 128 MiB, up to 128 MiB unpacked in total, and 64 MiB per member. Use your computer to handle larger files.</p></li><li><h3>Browse your content</h3><p>Select a character to see every owned card for that character; select a card for details. Teams show saved positions. Resources show saved values. Costumes and additional hairstyles have their own gallery.</p></li></ol><div class=\"note\"><b>Appearance records</b><p>Costume-default hair records are separate from additional hairstyles. Missing independent images are not replaced with character portraits. Game names and original data remain in their original form when you change the interface language.</p></div>"
      ],
      [
        "export",
        "Export an account ZIP",
        "<ol class=\"steps\"><li><h3>Import and select an account</h3><p>Export is disabled until an archive is loaded. Choose the intended snapshot before exporting.</p></li><li><h3>Select Export archive</h3><p>The browser prepares the saved data and available generic thumbnails. Wait for the archive-ready dialog.</p></li><li><h3>Select Download account ZIP</h3><p>The ready dialog is not the download itself. Confirm that the ZIP appears in your browser downloads or Files app, then re-import it to check the result.</p></li></ol><div class=\"note\"><b>What the ZIP contains</b><p>It preserves the snapshot, original payloads and media already present in the input, plus thumbnails actually added during export. It cannot recreate a missing raw protobuf or photo original. Imported secrets are not inspected or removed from full backups; keep them private.</p></div>"
      ],
      [
        "photos",
        "Export photo URLs",
        "<ol class=\"steps\"><li><h3>Check link coverage</h3><p>Photo IDs and asset IDs are not download URLs. Older packages may need a matching photo-links JSON, imported using Import photo links. A file for another account is rejected.</p></li><li><h3>Choose a format</h3><div class=\"format-grid\"><div><b>JSON</b><p>Full mapping and records; can be imported again for the same account.</p></div><div><b>CSV</b><p>One row per photo with original URL, thumbnail URL and status.</p></div><div><b>TXT</b><p>Deduplicated original image URLs for download tools.</p></div></div></li><li><h3>Open or download an image</h3><p>Original and Thumbnail open the returned official URL in a new tab. Save the image using your browser. Opening the list never downloads all remote photos automatically.</p></li></ol><div class=\"note warm\"><b>A link list is not a full photo backup</b><p>Real samples have downloaded without cookies, game tokens or URL signatures. That does not prove every URL works anonymously or stays valid forever. Records with no returned URL stay visible; their paths are not guessed.</p></div>"
      ],
      [
        "phone",
        "Use your phone",
        "<ol class=\"steps\"><li><h3>Save the ZIP to your phone</h3><p>Transfer it using a method you trust, then save it in Files or Downloads. A chat attachment preview may not support local file selection.</p></li><li><h3>Import it in a browser</h3><p>Open Archive Lens in your system browser, select Import backup, and choose the saved ZIP. Navigation and team layouts can scroll horizontally.</p></li><li><h3>Confirm exported files were saved</h3><p>Check Downloads or Save to Files. If an embedded chat browser blocks file downloads, use your system browser and keep the original ZIP.</p></li></ol><div class=\"note\"><b>Why a computer localhost address does not work on a phone</b><p>127.0.0.1 on your phone refers to the phone itself. Create the backup on the computer running Archive Bridge, then transfer the ZIP to your phone. Refreshing Archive Lens clears the imported session; import the ZIP again.</p></div>"
      ],
      [
        "privacy",
        "Privacy and coverage",
        "<ul><li>Archives are processed in the current browser and are not POSTed to the site.</li><li>Account data is not saved to localStorage or IndexedDB. The language choice travels in the URL.</li><li>Refreshing clears the imported session without deleting your original ZIP.</li><li>Public source contains generic code and assets, not account snapshots, ownership sets, private photo URLs or credentials.</li><li>Saving a complete User/Get response does not prove that every separate endpoint, photo original, message or phone history was captured.</li></ul>"
      ],
      [
        "faq",
        "Troubleshooting",
        "<details><summary>Pictures are missing after import</summary><p>Check whether the record exists. Missing files cannot be recreated from an ID alone. Default hairstyle records may have no independent preview.</p></details><details><summary>An export button is disabled</summary><p>Load an account first. Photo export also requires actual image URLs. After refreshing, import the ZIP again.</p></details><details><summary>A photo URL returns 403, 404 or a connection error</summary><p>Keep the original record and check its source and collection time. Use only an authorized collection flow to update it; do not guess paths or remove access parameters.</p></details><details><summary>Can this website sign in to the official game?</summary><p>No. Use Archive Bridge on your own computer for authorized collection, then import the resulting ZIP here.</p></details><details><summary>Can the ZIP restore my progress to the official game?</summary><p>No. These tools browse and export archives; they do not write a ZIP back into an official game account.</p></details>"
      ]
    ]
  },
  "zh": {
    "brand": "使用指南",
    "directory": "指南目录",
    "search": "搜索指南",
    "searchHint": "例如：导出、手机、照片",
    "open": "打开查看器 ↗",
    "hero": "从备份到查看，<br>一步一步来。",
    "lead": "Archive Bridge 在本地采集，Archive Lens 帮助你查看和导出已保存的内容。",
    "empty": "没有匹配的章节，请更换关键词。",
    "matches": " 个相关章节",
    "footer": "数据覆盖以实际备份包包含的内容为准。",
    "back": "返回查看器",
    "sections": [
      [
        "start",
        "从这里开始",
        "<div class=\"path-grid\"><a class=\"path\" href=\"#first-backup\"><span class=\"path-icon pale\">＋</span><h3>我还没有备份包</h3><p>下载 Archive Bridge，在自己的电脑上生成备份。</p><strong>首次取得备份 →</strong></a><a class=\"path\" href=\"#import\"><span class=\"path-icon\">ZIP</span><h3>我已经有 ZIP</h3><p>导入已有档案，查看卡牌、人物、编队与资源。</p><strong>导入备份 →</strong></a></div><div class=\"note\"><b>两个工具，分工明确</b><p><a href=\"https://github.com/Nagisa0803/archive-bridge\">Archive Bridge</a> 在电脑本地执行已授权的认证和采集。公开查看器只在浏览器里处理 ZIP，不要求游戏密码，也不上传帐号档案。</p></div>"
      ],
      [
        "first-backup",
        "首次取得备份",
        "<ol class=\"steps\"><li><h3>下载适合系统的 Archive Bridge</h3><p>打开 <a href=\"https://github.com/Nagisa0803/archive-bridge/releases\">Archive Bridge 发行页</a>，选择适合操作系统和架构的包并解压。支持范围和已知限制见采集端仓库。</p></li><li><h3>启动本地采集端</h3><p>运行应用，打开它显示的本机地址，选择输出目录。如果设置要求支持版本的游戏 APK，请选择自己的安装包；仓库不附带游戏 APK。</p></li><li><h3>使用自己的游戏帐号登录</h3><p>先在游戏内配置帐号连携。只在可信的本地采集端输入 ID 和密码，确认采集范围后手动启动。不要把凭据发到 GitHub Issue、聊天或公开查看器。</p></li><li><h3>等待完成并保存 ZIP</h3><p>密码已设置不代表备份已生成。等待完成，查看覆盖范围说明，保存 ZIP 并保留原始副本，再导入 Archive Lens。</p></li></ol>"
      ],
      [
        "import",
        "导入与查看",
        "<ol class=\"steps\"><li><h3>点击“导入备份”</h3><p>选择帐号 ZIP、快照 JSON 或完整 User/Get JSON。电脑也可拖放文件。照片链接 JSON 是补充资料，应在照片页导入。</p></li><li><h3>等待导入成功</h3><p>压缩包最多 128 MiB，解压后合计最多 128 MiB，单文件最多 64 MiB。更大的文件请先在电脑上处理。</p></li><li><h3>查看拥有内容</h3><p>点击人物展示此人物全部已拥有卡片，点开单卡查看详情。编队保留位置，资源显示已保存数值，衣装与额外发型有独立图库。</p></li></ol><div class=\"note\"><b>外观记录</b><p>衣装默认发型与额外发型分别显示。没有独立图时不使用人物头像代替。切换界面语言不会改写游戏原名或原始帐号数据。</p></div>"
      ],
      [
        "export",
        "导出帐号 ZIP",
        "<ol class=\"steps\"><li><h3>先导入并选中帐号</h3><p>没有档案时无法导出。导出前确认选择了所需快照。</p></li><li><h3>点击“导出帐号包”</h3><p>浏览器整理已保存数据和可用的通用缩略图，等待“帐号包已准备好”弹窗。</p></li><li><h3>点击“下载帐号 ZIP”</h3><p>弹窗出现不等于文件已下载。到浏览器下载列表或手机文件 App 确认保存，再重新导入验证。</p></li></ol><div class=\"note\"><b>ZIP 包含什么？</b><p>保留输入中已有的快照、原始响应和媒体，以及实际附带的缩略图。无法补出未保存的 protobuf 或照片原图。导出不应包含引继密码、登录令牌或 TLS 密钥。</p></div>"
      ],
      [
        "photos",
        "导出照片链接",
        "<ol class=\"steps\"><li><h3>确认链接覆盖</h3><p>照片 ID、资源 ID 本身不是下载地址。旧包可通过“导入照片链接”补充同帐号 JSON；其他帐号的文件会被拒绝。</p></li><li><h3>选择导出格式</h3><div class=\"format-grid\"><div><b>JSON</b><p>完整对应关系和记录，可在同帐号再次导入。</p></div><div><b>CSV</b><p>逐条照片的原图、缩略图链接和状态。</p></div><div><b>TXT</b><p>去重后的原图 URL 清单，适合下载工具。</p></div></div></li><li><h3>打开或下载图片</h3><p>“原图”和“缩略图”在新标签页打开官方返回地址，再按浏览器方式保存。查看列表不会自动下载远端全部照片。</p></li></ol><div class=\"note warm\"><b>链接清单不是完整照片备份</b><p>真实样本已验证无需 Cookie、游戏令牌或 URL 签名即可下载；这不代表所有链接匿名可用或永久有效。未返回 URL 的记录仍会保留，不会猜测路径。</p></div>"
      ],
      [
        "phone",
        "手机上查看",
        "<ol class=\"steps\"><li><h3>把 ZIP 保存到手机</h3><p>通过可信方式传送，存入文件 App 或下载目录。聊天附件预览不一定支持选择本地文件。</p></li><li><h3>在浏览器里导入</h3><p>用系统浏览器打开 Archive Lens，选择“导入备份”并选取 ZIP。导航栏和编队可以横向滑动。</p></li><li><h3>确认导出已保存</h3><p>检查下载列表或“存储到文件”。若聊天内置浏览器阻止下载，改用系统浏览器，先保留原包。</p></li></ol><div class=\"note\"><b>手机为什么打不开电脑的本机地址？</b><p>手机的 127.0.0.1 指向手机自己。先在运行 Archive Bridge 的电脑取得 ZIP，再传到手机。刷新查看器会清空当前导入状态，重新导入即可。</p></div>"
      ],
      [
        "privacy",
        "隐私与数据覆盖",
        "<ul><li>帐号文件只在当前浏览器处理，不 POST 上传到站点。</li><li>帐号数据不写 localStorage 或 IndexedDB；语言选择通过网址参数传递。</li><li>刷新只清空当前导入状态，不删除原 ZIP。</li><li>公开源码只有通用代码和素材，没有帐号快照、拥有集合、照片私链或凭据。</li><li>完整保存某次 User/Get，不代表所有独立接口、照片原图、消息或电话历史都已覆盖。</li></ul>"
      ],
      [
        "faq",
        "常见问题",
        "<details><summary>导入后缺图</summary><p>先看记录是否存在。无法仅凭 ID 补回图片，默认发型也可能没有独立预览。</p></details><details><summary>导出按钮是灰色的</summary><p>先导入帐号。照片导出还需要实际图片 URL。刷新后请重新导入 ZIP。</p></details><details><summary>照片链接出现 403、404 或连接错误</summary><p>保留原记录，检查链接来源和时间。通过本人授权的采集流程更新，不猜路径或移除权限参数。</p></details><details><summary>网页能登录官方游戏吗？</summary><p>不能。请在自己电脑使用 Archive Bridge 授权采集，再把生成的 ZIP 导入这里。</p></details><details><summary>ZIP 能恢复官方游戏进度吗？</summary><p>不能。这些工具用于查看与导出，不把 ZIP 写回官方帐号。</p></details>"
      ]
    ]
  },
  "ja": {
    "brand": "使い方ガイド",
    "directory": "ガイド目次",
    "search": "ガイドを検索",
    "searchHint": "例: 出力、スマートフォン、写真",
    "open": "ビューアーを開く ↗",
    "hero": "バックアップから閲覧まで、<br>ひとつずつ。",
    "lead": "Archive Bridge でローカル取得し、Archive Lens で保存済みデータを閲覧・出力します。",
    "empty": "該当する項目がありません。別のキーワードをお試しください。",
    "matches": " 件の関連項目",
    "footer": "収録範囲は実際のアーカイブ内容によって異なります。",
    "back": "ビューアーに戻る",
    "sections": [
      [
        "start",
        "ここから始める",
        "<div class=\"path-grid\"><a class=\"path\" href=\"#first-backup\"><span class=\"path-icon pale\">＋</span><h3>初めてバックアップする</h3><p>Archive Bridge をダウンロードし、自分のPCでアーカイブを作成します。</p><strong>バックアップを作成 →</strong></a><a class=\"path\" href=\"#import\"><span class=\"path-icon\">ZIP</span><h3>すでに ZIP がある</h3><p>保存済みのカード・キャラクター・編成・リソースを閲覧します。</p><strong>インポートする →</strong></a></div><div class=\"note\"><b>ふたつのツールの役割</b><p><a href=\"https://github.com/Nagisa0803/archive-bridge\">Archive Bridge</a> はPC上で許可した認証・取得を実行します。この公開ビューアーはブラウザー内でZIPを処理し、ゲームのパスワードを求めたりアーカイブをアップロードしたりしません。</p></div>"
      ],
      [
        "first-backup",
        "初回バックアップ",
        "<ol class=\"steps\"><li><h3>対応する Archive Bridge を入手</h3><p><a href=\"https://github.com/Nagisa0803/archive-bridge/releases\">リリース一覧</a>でOSとCPUアーキテクチャに合うファイルを選び、展開します。対応環境と既知の制限は取得ツールのリポジトリを確認してください。</p></li><li><h3>ローカル取得ツールを起動</h3><p>表示されたローカルURLを開き、保存先を指定します。対応ゲームAPKの選択を求められたら、自分のインストール用パッケージを選びます。ゲームAPKは同梱されていません。</p></li><li><h3>自分のゲームアカウントで認証</h3><p>ゲーム内でアカウント連携を設定します。IDとパスワードは信頼するローカル取得ツールだけに入力し、範囲を確認して取得を開始します。GitHub Issue、チャット、この公開サイトには入力しないでください。</p></li><li><h3>完了後に ZIP を保存</h3><p>パスワード設定だけではバックアップはできません。完了と収録範囲を確認してZIPを保存し、元のコピーを保管したうえでArchive Lensに読み込みます。</p></li></ol>"
      ],
      [
        "import",
        "インポートと閲覧",
        "<ol class=\"steps\"><li><h3>「バックアップをインポート」を選択</h3><p>アカウントZIP、スナップショットJSON、完全なUser/Get JSONに対応します。PCではドラッグも可能です。写真リンクJSONは写真画面から追加します。</p></li><li><h3>完了を待つ</h3><p>ZIP本体と展開後の合計は各128 MiB、各ファイルは64 MiBまでです。大きなファイルは先にPCで処理してください。</p></li><li><h3>所持コンテンツを閲覧</h3><p>キャラクターを選ぶと所持カードをすべて表示し、カードから詳細を開けます。編成は保存位置、リソースは保存済みの値を表示します。衣装と追加ヘアには専用ギャラリーがあります。</p></li></ol><div class=\"note\"><b>外観レコード</b><p>衣装デフォルトのヘアと追加ヘアを分けて表示します。個別画像をキャラクターの顔画像で代用しません。表示言語を変えてもゲーム内の名前や元データは変更しません。</p></div>"
      ],
      [
        "export",
        "アカウント ZIP を出力",
        "<ol class=\"steps\"><li><h3>アーカイブを読み込んで選ぶ</h3><p>未読み込みの状態では出力できません。必要なスナップショットを選択してください。</p></li><li><h3>「アーカイブを出力」を選択</h3><p>保存済みデータと取得可能な共通サムネイルをブラウザー内で準備します。準備完了のダイアログを待ちます。</p></li><li><h3>「アカウントZIPをダウンロード」を選択</h3><p>ダイアログ表示だけではダウンロードされません。ブラウザーのダウンロードやファイルアプリで保存を確認し、再インポートして確認します。</p></li></ol><div class=\"note\"><b>ZIPに含まれるもの</b><p>入力に存在したスナップショット、元の応答、メディアと、実際に追加したサムネイルを保持します。未保存のprotobufや写真原画像は生成できません。完全バックアップ内の認証情報は検査・削除しません。非公開で保管してください。</p></div>"
      ],
      [
        "photos",
        "写真URLを出力",
        "<ol class=\"steps\"><li><h3>リンクの収録範囲を確認</h3><p>写真IDや素材IDはダウンロードURLではありません。旧ZIPには同じアカウントの写真リンクJSONを追加できます。別アカウントのファイルは拒否します。</p></li><li><h3>形式を選択</h3><div class=\"format-grid\"><div><b>JSON</b><p>対応関係と全記録。同じアカウントに再インポートできます。</p></div><div><b>CSV</b><p>写真ごとの原画像・サムネイルURLと状態。</p></div><div><b>TXT</b><p>重複を除いた原画像URL。ダウンロードツール向け。</p></div></div></li><li><h3>画像を開いて保存</h3><p>原画像・サムネイルを選ぶと公式から取得したURLを新しいタブで開きます。一覧を開いただけで全写真を自動取得することはありません。</p></li></ol><div class=\"note warm\"><b>URL一覧は写真全体のバックアップではありません</b><p>実際のサンプルはCookie、ゲームトークン、URL署名なしで取得できましたが、すべてのURLの匿名利用や永久有効性を保証しません。URLがない記録も保持し、パスを推測しません。</p></div>"
      ],
      [
        "phone",
        "スマートフォンで使う",
        "<ol class=\"steps\"><li><h3>ZIPをスマートフォンに保存</h3><p>信頼する方法で転送し、ファイルアプリやダウンロードに保存します。チャット内プレビューではファイル選択に対応しない場合があります。</p></li><li><h3>ブラウザーでインポート</h3><p>標準ブラウザーでArchive Lensを開き、保存したZIPを選びます。ナビゲーションや編成は横にスクロールできます。</p></li><li><h3>出力ファイルの保存を確認</h3><p>ダウンロード一覧や「ファイルに保存」を確認します。チャット内ブラウザーで保存できない場合は標準ブラウザーを使用し、元のZIPを保管してください。</p></li></ol><div class=\"note\"><b>PCのローカルURLを開けない理由</b><p>スマートフォンの127.0.0.1はスマートフォン自身です。PCのArchive BridgeでZIPを作成して転送してください。ページ更新後はZIPを再インポートします。</p></div>"
      ],
      [
        "privacy",
        "プライバシーと収録範囲",
        "<ul><li>アーカイブは現在のブラウザー内で処理し、サイトへPOSTしません。</li><li>アカウントデータはlocalStorageやIndexedDBに保存しません。言語設定はURLに保持します。</li><li>更新しても元のZIPは削除されず、読み込み状態だけが消えます。</li><li>公開コードにアカウント、所持一覧、プライベート写真URL、認証情報を含めません。</li><li>完全なUser/Getを保存しても、個別APIや写真原画像、メッセージ・電話の全履歴を収録した証明にはなりません。</li></ul>"
      ],
      [
        "faq",
        "よくある問題",
        "<details><summary>インポート後に画像がない</summary><p>記録の有無を確認してください。IDだけでは画像を再作成できません。デフォルトヘアには個別画像がない場合もあります。</p></details><details><summary>出力ボタンを押せない</summary><p>先にアーカイブを読み込んでください。写真リンク出力には実際の画像URLが必要です。更新後は再インポートしてください。</p></details><details><summary>写真URLが403、404、接続エラーになる</summary><p>元の記録を保持し、取得元と日時を確認してください。本人が許可した取得処理で更新し、パスの推測やアクセス用パラメーターの削除はしないでください。</p></details><details><summary>このサイトで公式ゲームにログインできる？</summary><p>できません。自分のPCでArchive Bridgeを使用して取得し、そのZIPを読み込みます。</p></details><details><summary>ZIPで公式ゲームの進行を復元できる？</summary><p>できません。アーカイブの閲覧・出力用で、公式アカウントへZIPを書き戻す機能はありません。</p></details>"
      ]
    ]
  },
  "ko": {
    "brand": "사용 가이드",
    "directory": "가이드 목차",
    "search": "가이드 검색",
    "searchHint": "예: 내보내기, 모바일, 사진",
    "open": "뷰어 열기 ↗",
    "hero": "백업부터 보기까지,<br>한 단계씩.",
    "lead": "Archive Bridge에서 로컬로 수집하고, Archive Lens에서 저장된 내용을 확인하고 내보냅니다.",
    "empty": "일치하는 항목이 없습니다. 다른 검색어를 입력하세요.",
    "matches": "개 관련 항목",
    "footer": "데이터 범위는 실제 아카이브에 포함된 내용에 따라 다릅니다.",
    "back": "뷰어로 돌아가기",
    "sections": [
      [
        "start",
        "여기에서 시작",
        "<div class=\"path-grid\"><a class=\"path\" href=\"#first-backup\"><span class=\"path-icon pale\">＋</span><h3>처음 백업합니다</h3><p>Archive Bridge를 다운로드하고 내 컴퓨터에서 백업을 만듭니다.</p><strong>백업 만들기 →</strong></a><a class=\"path\" href=\"#import\"><span class=\"path-icon\">ZIP</span><h3>이미 ZIP이 있습니다</h3><p>저장된 카드, 캐릭터, 편성, 자원을 확인합니다.</p><strong>백업 가져오기 →</strong></a></div><div class=\"note\"><b>두 도구의 역할</b><p><a href=\"https://github.com/Nagisa0803/archive-bridge\">Archive Bridge</a>는 컴퓨터에서 승인된 인증과 수집을 실행합니다. 공개 뷰어는 브라우저에서 ZIP을 처리하며 게임 비밀번호를 요구하거나 아카이브를 업로드하지 않습니다.</p></div>"
      ],
      [
        "first-backup",
        "첫 백업 만들기",
        "<ol class=\"steps\"><li><h3>환경에 맞는 Archive Bridge 받기</h3><p><a href=\"https://github.com/Nagisa0803/archive-bridge/releases\">릴리스 페이지</a>에서 운영체제와 CPU 아키텍처에 맞는 파일을 받아 압축을 풉니다. 지원 환경과 알려진 제한은 수집기 저장소를 확인하세요.</p></li><li><h3>로컬 수집기 실행</h3><p>앱이 표시하는 로컬 주소를 열고 저장 폴더를 선택합니다. 지원되는 게임 APK가 필요하다고 표시되면 본인의 설치 패키지를 선택하세요. 저장소에 게임 APK는 포함되지 않습니다.</p></li><li><h3>본인 게임 계정으로 로그인</h3><p>게임에서 계정 연동을 먼저 설정합니다. ID와 비밀번호는 신뢰하는 로컬 수집기에만 입력하고 범위를 확인한 뒤 수집을 시작하세요. GitHub Issue, 채팅, 공개 뷰어에 자격 증명을 입력하지 마세요.</p></li><li><h3>완료 후 ZIP 저장</h3><p>비밀번호 설정만으로 백업이 생성되지는 않습니다. 완료와 수집 범위를 확인하고 ZIP을 저장하세요. 원본 사본을 보관한 뒤 Archive Lens로 가져옵니다.</p></li></ol>"
      ],
      [
        "import",
        "가져오기 및 보기",
        "<ol class=\"steps\"><li><h3>백업 가져오기 선택</h3><p>계정 ZIP, 스냅샷 JSON, 전체 User/Get JSON을 지원합니다. 컴퓨터에서는 끌어 놓을 수도 있습니다. 사진 링크 JSON은 사진 화면에서 추가합니다.</p></li><li><h3>성공 메시지 확인</h3><p>ZIP 파일과 압축 해제 후 전체 크기는 각각 최대 128 MiB, 파일 하나는 64 MiB까지 지원합니다. 큰 파일은 컴퓨터에서 먼저 처리하세요.</p></li><li><h3>보유 콘텐츠 확인</h3><p>캐릭터를 선택하면 해당 캐릭터의 보유 카드가 모두 표시되며 카드를 눌러 상세 내용을 봅니다. 편성 위치와 자원 값은 저장된 데이터를 사용하고 의상과 추가 헤어는 별도 갤러리로 표시합니다.</p></li></ol><div class=\"note\"><b>외형 기록</b><p>의상 기본 헤어와 추가 헤어를 구분합니다. 개별 이미지가 없다고 캐릭터 초상으로 대체하지 않습니다. 인터페이스 언어를 바꿔도 게임 이름과 원본 계정 데이터는 바뀌지 않습니다.</p></div>"
      ],
      [
        "export",
        "계정 ZIP 내보내기",
        "<ol class=\"steps\"><li><h3>계정 가져오기 및 선택</h3><p>아카이브를 불러오기 전에는 내보낼 수 없습니다. 원하는 스냅샷을 선택하세요.</p></li><li><h3>아카이브 내보내기 선택</h3><p>브라우저가 저장된 데이터와 사용 가능한 공통 썸네일을 준비합니다. 준비 완료 대화상자를 기다리세요.</p></li><li><h3>계정 ZIP 다운로드 선택</h3><p>대화상자가 열렸다고 다운로드가 끝난 것은 아닙니다. 다운로드 목록이나 파일 앱에서 저장을 확인한 뒤 다시 가져와 검증하세요.</p></li></ol><div class=\"note\"><b>ZIP에 포함되는 내용</b><p>입력에 있던 스냅샷, 원본 응답, 미디어 및 실제로 추가된 썸네일을 보존합니다. 누락된 protobuf나 사진 원본을 새로 만들 수는 없습니다. 전체 백업의 인증 정보는 검사하거나 제거하지 않습니다. 비공개로 보관하세요。</p></div>"
      ],
      [
        "photos",
        "사진 URL 내보내기",
        "<ol class=\"steps\"><li><h3>링크 수집 범위 확인</h3><p>사진 ID와 리소스 ID는 다운로드 주소가 아닙니다. 이전 ZIP에는 같은 계정의 사진 링크 JSON을 추가할 수 있습니다. 다른 계정의 파일은 거부됩니다.</p></li><li><h3>형식 선택</h3><div class=\"format-grid\"><div><b>JSON</b><p>전체 대응 관계와 기록. 같은 계정에 다시 가져올 수 있습니다.</p></div><div><b>CSV</b><p>사진별 원본 URL, 썸네일 URL, 상태.</p></div><div><b>TXT</b><p>중복을 제거한 원본 URL 목록. 다운로드 도구에 적합합니다.</p></div></div></li><li><h3>이미지 열기 또는 다운로드</h3><p>원본이나 썸네일을 선택하면 공식 URL이 새 탭에서 열립니다. 브라우저로 저장하세요. 목록을 보는 것만으로 모든 사진을 자동 다운로드하지 않습니다.</p></li></ol><div class=\"note warm\"><b>링크 목록은 전체 사진 백업이 아닙니다</b><p>실제 샘플은 쿠키, 게임 토큰, URL 서명 없이 다운로드되었지만 모든 링크의 익명 접근이나 영구 유효성을 보장하지 않습니다. URL이 없는 기록도 보존하며 경로를 추측하지 않습니다.</p></div>"
      ],
      [
        "phone",
        "휴대폰에서 사용",
        "<ol class=\"steps\"><li><h3>휴대폰에 ZIP 저장</h3><p>신뢰하는 방법으로 전송한 뒤 파일 앱이나 다운로드 폴더에 저장하세요. 채팅 첨부파일 미리보기에서는 로컬 파일을 선택하지 못할 수 있습니다.</p></li><li><h3>브라우저에서 가져오기</h3><p>시스템 브라우저에서 Archive Lens를 열어 ZIP을 선택하세요. 탐색 메뉴와 편성은 가로로 스크롤할 수 있습니다.</p></li><li><h3>내보낸 파일 저장 확인</h3><p>다운로드 목록이나 파일에 저장 메뉴를 확인하세요. 채팅 내장 브라우저가 차단하면 시스템 브라우저를 사용하고 원본 ZIP을 보관하세요.</p></li></ol><div class=\"note\"><b>컴퓨터의 로컬 주소가 휴대폰에서 열리지 않는 이유</b><p>휴대폰의 127.0.0.1은 휴대폰 자체를 가리킵니다. Archive Bridge가 실행되는 컴퓨터에서 ZIP을 만든 뒤 옮기세요. 새로고침하면 가져온 세션이 지워지므로 다시 가져오세요.</p></div>"
      ],
      [
        "privacy",
        "개인정보 및 데이터 범위",
        "<ul><li>아카이브는 현재 브라우저에서 처리하며 사이트에 POST 업로드하지 않습니다.</li><li>계정 데이터는 localStorage나 IndexedDB에 저장하지 않습니다. 언어 선택은 URL에 포함됩니다.</li><li>새로고침은 불러온 상태만 지우며 원본 ZIP을 삭제하지 않습니다.</li><li>공개 소스에는 공통 코드와 소재만 있으며 계정, 보유 목록, 비공개 사진 URL, 자격 증명을 포함하지 않습니다.</li><li>전체 User/Get 응답 저장이 모든 별도 API, 사진 원본, 메시지 또는 전화 이력 수집을 증명하지는 않습니다.</li></ul>"
      ],
      [
        "faq",
        "문제 해결",
        "<details><summary>가져온 뒤 이미지가 없습니다</summary><p>기록이 있는지 먼저 확인하세요. ID만으로 이미지를 복원할 수 없으며 기본 헤어에는 개별 미리보기가 없을 수 있습니다.</p></details><details><summary>내보내기 버튼이 비활성화되어 있습니다</summary><p>먼저 계정을 가져오세요. 사진 링크 내보내기에는 실제 이미지 URL도 필요합니다. 새로고침 후에는 ZIP을 다시 가져오세요.</p></details><details><summary>사진 URL이 403, 404 또는 연결 오류를 반환합니다</summary><p>원본 기록을 보관하고 출처와 시간을 확인하세요. 본인이 승인한 수집 흐름으로 갱신하며 경로를 추측하거나 접근 매개변수를 제거하지 마세요.</p></details><details><summary>이 사이트에서 공식 게임에 로그인할 수 있나요?</summary><p>아니요. 본인 컴퓨터의 Archive Bridge에서 승인된 수집을 진행하고 생성된 ZIP을 여기로 가져오세요.</p></details><details><summary>ZIP으로 공식 게임 진행도를 복원할 수 있나요?</summary><p>아니요. 도구는 아카이브 보기와 내보내기용이며 공식 계정에 ZIP을 쓰지 않습니다.</p></details>"
      ]
    ]
  }
};
