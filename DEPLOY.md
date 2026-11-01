# GitHub → Cloudflare Pages 部署

这是纯静态项目，公开仓库与公开站点不包含任何帐号数据。原有 ChatGPT Site 的源码身份与 Git 历史没有复制进来。

## 1. 创建并推送 GitHub 仓库

建议名称：`archive-lens`。可见性按项目要求设为 Public。将本目录作为独立仓库推送；不要把整个游戏项目、父目录、设备恢复副本或本地采集端上传。

如果远程仓库为空，可在已完成 GitHub 认证后运行：

```sh
git remote add origin https://github.com/Nagisa0803/archive-lens.git
git push -u origin main
```

凭据通过 GitHub 连接、CLI 或系统凭据管理器授权，不写入远程 URL、脚本或源码。

## 2. 在 Cloudflare Pages 关联 GitHub

1. 登录 Cloudflare，打开 Workers & Pages。
2. 创建应用，选择 Pages，然后导入现有 Git 仓库。
3. 授权并选择 `archive-lens`；只授权所需仓库即可。
4. Framework preset 选择 None，生产分支 `main`。
5. 仓库根目录留空，Build command 填 `npm run build`，Build output directory 填 `public`。
6. 无需填任何游戏帐号信息或环境变量，保存并部署。
7. Cloudflare 返回 `*.pages.dev` 地址后，分别打开 `/` 和 `/guide/` 验证。根目录必须能加载 `index.html`。

当前脚本使用 Node.js 标准库；无需 npm install 或外部服务。`public/_headers` 为 Pages 静态响应配置 CSP、Referrer-Policy 等头。浏览器读取本地 ZIP 无需放宽为任意外部连接。

## 3. 发布后检查

- 首次打开是空档案，可从「使用指南」进入 Wiki。
- 指南搜索和手机目录工作正常，返回查看器链接可用。
- 只在自己的浏览器导入备份；仓库与部署记录不出现帐号快照或照片私链。
- ZIP 导出、重新导入及照片链接导出按实际备份内容核对。
- 后续推送 `main` 由 Pages 自动构建；不要改用不相关的帐号采集部署流程。

参考：[Cloudflare 静态 HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)、[Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)、[Headers](https://developers.cloudflare.com/pages/configuration/headers/)。
