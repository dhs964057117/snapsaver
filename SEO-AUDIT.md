# SnapSaver Google 收录诊断

检查日期：2026-10-19（America/New_York）。对象为 `snapsaver.suanss.com`，Search Console 属性为 `sc-domain:suanss.com`。

## 已确认的情况

Search Console 筛选 **SnapSaver 的 sitemap** 后，报告更新时间为 2026-10-11：

| 项目 | 结果 |
| --- | --- |
| 已编入索引 | 0 |
| 已抓取－尚未编入索引 | 12 |
| 已发现－尚未编入索引 | 11 |
| 已抓取未收录的验证 | 2026-08-09 开始，2026-10-05 失败 |
| 首页上次抓取 | 2026-09-25，Googlebot 智能手机版 |
| 是否允许抓取 / 网页抓取 / 是否允许索引 | 是 / 成功 / 是 |
| 首页用户声明的规范网址 | `https://snapsaver.suanss.com/` |
| 首页 Google 选择的规范网址 | 所检查的网址 |
| 今日首页实际网址测试 | 网址可编入 Google 索引 |
| sitemap 状态 | 成功；2026-10-09 上次读取；发现 23 页 |
| 属性的人工处置措施 / 安全问题 | 均未检测到任何问题 |

因此，已有证据不支持把首页未收录归因于 robots 禁止、noindex、首页抓取失败或人工处罚。Google 已发现并抓取部分页面，但尚未将其纳入索引。“已抓取－尚未编入索引”没有披露唯一原因，不能据此断言某项修改一定能使网站收录。

## 发现并修复的问题

### 1. Google 渲染时依赖的 Tailwind CDN 失败

在 Search Console 首页实时测试中，“被测试的网页 → 详情 → 网页中的资源”显示 11 项中 1 项无法加载：

- 类型：脚本。
- 地址：`https://cdn.tailwindcss.com/`。
- 原因：重定向错误。
- 控制台同时出现 Tailwind CDN 不适用于生产环境的警告。

修复：使用锁定版本的 Tailwind CLI 编译为本地 `/assets/site.css`，首页和隐私页均移除 CDN 脚本。内容在初始 HTML 中完整提供，不依赖脚本生成。

### 2. 不存在的网址返回首页与 200

公开 HTTP 检查：`/seo-probe-not-found/` 返回 **200**，响应正文的 SHA-256 与首页完全一致。仓库没有顶层 `404.html`，行为与 Cloudflare Pages 的默认 SPA 回退一致。

修复：添加顶层 `404.html`，包含 `noindex, follow` 与有效导航；发布文件必须保留此文件。部署后仍需检查实际随机路径返回 404，并确认没有额外 catch-all rewrite。

### 3. 自动语言跳转和爬虫差异

原首页读取浏览器语言和 localStorage 后自动跳转，并按 User-Agent 跳过爬虫。它增加渲染和语言 URL 判断的复杂度。

修复：仅在用户主动选择语言时导航；所有访客获得同一 URL 对应的静态内容。保留 22 语言独立 URL、自引用 canonical、双向 hreflang 和可抓取语言链接。

### 4. 大量重复传输的翻译数据

每个语言 HTML 原来都携带所有语言的完整翻译和运行时代码。英文首页由 **260,964 字节降至约 75,772 字节（减少 71%）**；共享样式约 32 KB，共享交互脚本约 1.8 KB。所有页面均不再嵌入整包翻译。

### 5. 产品信息与真实 App 不一致

原文包含数百万用户、提速 300%、永久免费、无广告无跟踪等未经项目证据支持或相互矛盾的说法。固定展示的 1.0.0 也没有与发布版本保持一致。App 项目实际包含广告、Firebase 统计和可选天气定位，最低 Android SDK 为 24（Android 7.0）。

修复：移除数百万用户、300% 性能及无广告无跟踪宣传；调整核心免费说明、Android 要求、隐私摘要，版本以 Google Play 为准。英文和中文的主要文案补充网站与资源限制。JSON-LD 使用真实 App 包名对应的 Play 安装地址，不虚构评价与星级。

### 6. 独立帮助内容不足

新增下载指南、故障排查和应用支持三类页面，各提供英文、简中、繁中版本，共 9 页，并通过首页、页尾及内容页互相链接。内容解释真实操作、M3U8 与 MP4 区别、过期资源、后台限制、文件查找和联系渠道。没有批量生成同义关键词落地页。

### 7. sitemap 日期与发布范围

原构建每次都将全部页面 `lastmod` 改为当天。现在只在页面内容哈希变化时更新；`seo-manifest.json` 记录状态。sitemap 现含 32 个可索引页面，不包含 404、构建源文件和无关项目。发布目录使用文件白名单生成。

## 已完成的验证

- `npm run build` 成功，生成 32 个页面和 43 个公开文件。
- `npm run check` 通过：唯一标题、自引用 canonical、双向 hreflang、JSON-LD 解析、H1、站内链接、锚点、静态资源、404 标记、robots、发布范围及重建日期稳定性。
- 本地 HTTP：首页、简繁中、日文、指南、支持、隐私、CSS、JS、robots、sitemap 返回 200；随机路径、`/build.js`、`/incubator/` 返回 404。
- 浏览器预览确认中文与英文正文可见、样式正确、主题切换与语言导航工作正常。

## 发布后必须完成

源码修改与 Google 收录是两个阶段。以上 Search Console 实际测试针对初始诊断时在线的旧版本。后续已从 GitHub 检查记录确认托管为 Cloudflare Pages，项目名为 `snapsaverbrowser`；提交并推送代码会进入现有 Cloudflare 发布流程。实际发布结果应以新提交的检查状态与正式域名 HTTP 内容为准，再提交新版本收录请求。

1. 按 README 将构建命令设为 `npm run build`、输出目录设为 `dist`，发布并确认顶层 404 存在。
2. 用正式域名检查关键页面为 200、随机路径为 404、本地 CSS 可加载。
3. 在 Search Console 重新提交原 sitemap 地址，确认读取成功、发现 32 页。
4. 分别对首页、简中首页和关键指南执行“测试实际网址”；确认 HTML、截图和资源列表正常后请求编入索引。
5. 观察报告中的上次抓取时间、已抓取未收录、已发现未收录及展示数据变化。若新版本仍长期未收录，继续基于抓取日志、页面实际使用价值、真实开发者信息和相关网站自然链接排查，避免反复提交或购买外链。

## 参考文档

- [Cloudflare Pages 404 与 SPA 行为](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Google 多语言网站与自动语言跳转建议](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google sitemap 与 lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google 抓取与索引 FAQ：不保证收录](https://developers.google.com/search/help/crawling-index-faq)
