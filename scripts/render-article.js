exports.renderArticle = (page, { variants, alternates, resourceLinks, resourceLabels, home, escape, json, ORIGIN, PLAY }) => {
  const canonical = ORIGIN + page.path;
  const labels = resourceLabels[page.lang];
  return `<!doctype html>
<html lang="${page.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(page.title)} | SnapSaver</title>
  <meta name="description" content="${escape(page.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  ${alternates(variants)}
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${escape(page.title)} | SnapSaver">
  <meta property="og:description" content="${escape(page.description)}">
  <meta property="og:image" content="${ORIGIN}/preview-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, inLanguage: page.lang },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SnapSaver', item: ORIGIN + home(page.lang) },
      { '@type': 'ListItem', position: 2, name: page.title, item: canonical }
    ] }
  ] })}</script>
</head>
<body class="bg-slate-50 text-slate-900 antialiased">
  <header class="border-b border-slate-200 bg-white"><nav class="max-w-3xl mx-auto px-6 py-6 flex flex-wrap items-center gap-5" aria-label="${escape(labels.title)}"><a class="font-bold text-xl text-brand-600" href="${home(page.lang)}">SnapSaver</a><a class="ml-auto text-sm text-brand-600" href="${PLAY}" target="_blank" rel="noopener noreferrer">Google Play</a></nav></header>
  <main class="max-w-3xl mx-auto px-6 py-12">
    <nav class="text-sm text-slate-500 mb-8" aria-label="Breadcrumb"><a class="underline" href="${home(page.lang)}">SnapSaver</a> / ${escape(page.title)}</nav>
    <article><h1 class="text-3xl sm:text-4xl font-bold leading-tight mb-6">${escape(page.title)}</h1><p class="text-lg text-slate-600 mb-10">${escape(page.description)}</p><div class="article-content">${page.body}</div></article>
    <nav class="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-5" aria-label="${escape(labels.title)}">${resourceLinks(page.lang)}</nav>
  </main>
  <footer class="max-w-3xl mx-auto px-6 py-8 text-sm text-slate-500"><nav class="flex flex-wrap gap-5" aria-label="Languages">${Object.entries(variants).map(([lang, url]) => `<a href="${url}" hreflang="${lang}" lang="${lang}" class="underline">${{ en: 'English', 'zh-CN': '简体中文', 'zh-HK': '繁體中文' }[lang]}</a>`).join(' ')}<a class="underline" href="/privacy/">${escape(labels.privacy)}</a></nav><p class="mt-6">© SnapSaver</p></footer>
</body>
</html>\n`;
};
