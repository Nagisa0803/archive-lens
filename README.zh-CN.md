# Archive Lens

[![Powered by Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://archive-lens.chiyoda-site.workers.dev/)

[English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

在浏览器本地查看 IDOLY PRIDE 帐号备份，支持英中日韩切换，默认英语。

**[在线查看器](https://archive-lens.chiyoda-site.workers.dev/)** · **[使用指南](https://archive-lens.chiyoda-site.workers.dev/guide/?lang=zh)** · **[采集端下载](https://github.com/Nagisa0803/archive-bridge/releases)**

## 两个项目的分工

[Archive Bridge](https://github.com/Nagisa0803/archive-bridge) 在电脑本地执行本人授权的认证、只读采集和 ZIP 导出。[Archive Lens](https://github.com/Nagisa0803/archive-lens) 是公开静态查看器，在浏览器内导入、浏览并再次导出。先用采集端生成备份，再把 ZIP 导入查看器；公开网页不索取游戏密码，也不运行采集后端。

## 功能

- 查看卡牌、人物、编队、资源和原始记录；点开人物展示此人物全部已拥有卡片，单卡可继续查看详情。
- 衣装与额外发型有原生缩略图，衣装默认记录单独分类，不用头像替代预览。
- 导入 ZIP / JSON，再次导出帐号 ZIP。
- 照片链接支持 JSON、CSV 和去重原图 TXT 导出，可补充导入同帐号链接 JSON。
- 八章可搜索 Wiki，手机目录和四语言切换；切换语言不丢失当前导入帐号。
- 页头 GitHub 图标与页脚仓库地址。

游戏原名和原始帐号数据不随界面语言改变。语言选择通过网址参数保留，不保存帐号内容。

## 隐私和边界

帐号文件仅在当前浏览器处理，不 POST 上传，不写 localStorage / IndexedDB；刷新后需重新导入。公开源码只有通用代码、完整通用外观定义和通用图片，不包含帐号快照、拥有集合、帐号指纹、照片私链、备份 ZIP、设备数据、密码、令牌或 TLS 密钥。

完整 User/Get 不等于独立接口、全部照片原图、消息或电话历史都已覆盖。缺图继续标记，不猜路径；链接导出不代表原图文件已备份，也不提供写回官方游戏的功能。

导入限制：ZIP 最多 128 MiB，解压合计最多 128 MiB，单文件最多 64 MiB。

## 本地运行和部署

Node.js 22+，无需安装 npm 依赖。

```sh
npm run build
npm run dev
```

查看器 `http://127.0.0.1:8793/`，指南 `/guide/`。使用 `?lang=en|zh|ja|ko` 或页面语言按钮切换。

线上地址目前是 Cloudflare Workers 静态托管；也支持 Pages：None 预设、main 分支、`npm run build`、输出 `public`、无环境密钥。详见 [DEPLOY.md](DEPLOY.md)。通用图片由构建分块恢复，发布检查拒绝私人资料和常见密钥。

[采集端仓库](https://github.com/Nagisa0803/archive-bridge) · [第三方说明](THIRD_PARTY_NOTICES.md)
