# SnapSaver 官方网站

官网：<https://snapsaver.suanss.com/>。静态多语言 Android App 官网，包含产品介绍、使用指南、故障排查与支持入口。

## 构建与检查

需要 Node.js 20 或更新版本。

```sh
npm ci
npm run build
npm run check
npm run preview
```

预览地址：<http://127.0.0.1:4173/>。发布产物位于 `dist/`。

构建顺序：生成静态 HTML 和 sitemap → 编译 Tailwind CSS → 将公开文件复制到 `dist/`。
`npm run check` 验证 canonical、双向 hreflang、JSON-LD、标题、站内链接、静态资源、404、发布文件范围和 sitemap 日期稳定性。

## 编辑内容

- `template.html`：首页布局，使用 `data-i18n` 标记翻译位置。
- `translations.json`：22 种语言的首页文本与 SEO 元数据。缺失的模板翻译会使构建失败。
- `scripts/content.js`：英文、简中、繁中的下载指南、排错和支持内容。
- `scripts/render-article.js`：内容页布局与元数据。
- `assets/site.js`：主题、移动菜单及用户主动选择语言；不根据浏览器语言、存储偏好或爬虫身份跳转。
- `styles/input.css`、`tailwind.config.js`：静态样式源文件。
- `privacy/index.html`：网站隐私说明摘要，链接 App 中使用的完整隐私政策。
- `seo-manifest.json`：按页面内容哈希记录真实修改日期，应随内容提交。普通重建不刷新所有页面的 `lastmod`。

根目录和语言目录中的 HTML 是生成文件，修改后必须重新构建。`fix.js`、`fix_seo.js`、`langs.json` 为旧版迁移文件，不属于当前构建流程，请使用上述源文件。

## Cloudflare Pages 部署

已从 GitHub 提交检查记录确认，原托管平台为 **Cloudflare Pages**，项目名为 `snapsaverbrowser`，项目地址为 <https://snapsaverbrowser.pages.dev/>，正式域名为 <https://snapsaver.suanss.com/>。GitHub 推送由 Cloudflare 集成自动发布，不需要新增 GitHub Actions。

仓库同时保留已生成的首页、指南、CSS、JS 和顶层 404，以兼容原先直接发布仓库静态文件的流程。推送后应查看新提交的 Cloudflare Pages 检查结果，再检查正式域名内容。

在现有 Pages 项目设置中使用：

| 设置 | 值 |
| --- | --- |
| 框架 | None |
| 构建命令 | `npm run build` |
| 输出目录 | `dist` |
| Node.js | 20 或更新版本 |
| 正式域名 | `snapsaver.suanss.com` |

仅发布 `dist/`。它不包含构建脚本、模板、完整翻译数据和仓库中与官网无关的目录。
若使用直接上传，上传 `dist/` 内的文件及其目录结构。

必须保留 `dist/404.html`。Cloudflare Pages 缺少顶层 `404.html` 时会将不存在的路径当作 SPA 路由返回首页。
检查现有部署配置中是否有 `/* /index.html 200` 一类 catch-all rewrite，并移除这种首页兜底规则。
本地预览服务器只能验证产物，正式 HTTP 状态必须在部署后再次确认。

部署后检查：

1. 首页、语言页、指南、CSS、`robots.txt`、`sitemap.xml` 返回 200。
2. 随机不存在的网址返回 **404**，不能再返回首页。
3. Search Console 的“测试实际网址”能读取新页面，资源列表不再依赖 `cdn.tailwindcss.com`。
4. 重新提交 `https://snapsaver.suanss.com/sitemap.xml`，确认成功读取 32 个页面。
5. 对首页、`/zh-CN/` 和主要指南请求编入索引；按报告观察后续抓取和收录。反复提交请求不保证收录。

本次诊断证据与后续步骤见 [SEO-AUDIT.md](SEO-AUDIT.md)。
