const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { pages, resourceLabels } = require('./scripts/content');
const { renderArticle } = require('./scripts/render-article');

const ORIGIN = 'https://snapsaver.suanss.com';
const PLAY = 'https://play.google.com/store/apps/details?id=com.awesome.dhs.tools.snapsave';
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, 'translations.json'), 'utf8'));
const langs = Object.keys(translations);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const json = value => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
const home = lang => lang === 'en' ? '/' : `/${lang}/`;
const helpLang = lang => resourceLabels[lang] ? lang : 'en';
const manifestPath = path.join(__dirname, 'seo-manifest.json');
const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
const manifest = {};
const indexable = [];
const today = new Date().toISOString().slice(0, 10);

function alternates(variants) {
  return Object.entries({ ...variants, 'x-default': variants.en }).map(([lang, url]) =>
    `<link rel="alternate" hreflang="${lang}" href="${ORIGIN}${url}">`).join('\n    ');
}
function record(url, html, variants) {
  const hash = crypto.createHash('sha256').update(html).digest('hex');
  const lastmod = previous[url]?.hash === hash ? previous[url].lastmod : today;
  manifest[url] = { hash, lastmod };
  indexable.push({ url, lastmod, variants });
}
function save(url, html, variants) {
  const file = `${url === '/' ? '' : url.slice(1)}index.html`;
  const fullPath = path.join(__dirname, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, html, 'utf8');
  record(url, html, variants);
}
function resourceLinks(lang) {
  const activeLang = helpLang(lang);
  const labels = resourceLabels[activeLang];
  return pages.filter(p => p.lang === activeLang).map((p, i) =>
    `<a href="${p.path}"${activeLang !== lang ? ' hreflang="en" lang="en"' : ''} class="text-brand-600 dark:text-brand-400 underline underline-offset-4">${escape(labels.links[i])}${activeLang !== lang ? ' (English)' : ''}</a>`).join('\n');
}
const homeVariants = Object.fromEntries(langs.map(lang => [lang, home(lang)]));
for (const lang of langs) {
  const content = translations[lang];
  let html = template.replace(/<html lang="[^"]+"/, `<html lang="${lang}"`);
  html = html.replace('<!-- INJECT_HREFLANG -->', alternates(homeVariants));
  html = html.replace(/(<([a-z][a-z0-9]*)\b[^>]*data-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/gi,
    (match, open, tag, key, close) => {
      if (!Object.hasOwn(content, key)) throw new Error(`Missing ${lang}.${key}`);
      return open + escape(content[key]) + close;
    });
  html = html.replace(/(<title[^>]*>)[\s\S]*?(<\/title>)/, `$1${escape(content.seo_title)}$2`);
  html = html.replace(/<meta\b[^>]*data-i18n-seo="([^"]+)"[^>]*>/g, (tag, key) => {
    const fallback = /title/.test(key) ? 'seo_title' : 'seo_desc';
    return tag.replace(/content="[^"]*"/, `content="${escape(content[key] || content[fallback])}"`);
  });
  const canonical = ORIGIN + home(lang);
  html = html.replace(/(<link rel="canonical" href=")[^"]+/, `$1${canonical}`)
    .replace(/(<meta property="og:url" content=")[^"]+/, `$1${canonical}`)
    .replace(/(<meta name="twitter:url" content=")[^"]+/, `$1${canonical}`);
  html = html.replace('<!-- INJECT_STRUCTURED_DATA -->', `<script type="application/ld+json">${json({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${ORIGIN}/#website`, name: 'SnapSaver', url: `${ORIGIN}/` },
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: content.seo_title,
        description: content.seo_desc, inLanguage: lang, isPartOf: { '@id': `${ORIGIN}/#website` }, mainEntity: { '@id': `${canonical}#app` } },
      { '@type': 'MobileApplication', '@id': `${canonical}#app`, name: 'SnapSaver', url: canonical,
        operatingSystem: 'Android 7.0 or later', applicationCategory: 'UtilitiesApplication', inLanguage: lang,
        description: content.hero_desc, downloadUrl: PLAY, installUrl: PLAY, sameAs: [PLAY],
        image: `${ORIGIN}/preview-image.jpg`, screenshot: ['browse-web-fast.jpg', 'find-download.jpg', 'manage-play.jpg'].map(p => `${ORIGIN}/${p}`),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: PLAY } }
    ]
  })}</script>`);
  html = html.replace(/onchange="changeLanguage\(this.value\)"/g, 'data-language-select')
    .replace(/<option value="([^"]+)"/g, (match, optionLang) =>
      `<option value="${optionLang}" data-url="${home(optionLang)}"${optionLang === lang ? ' selected' : ''}`);
  const labels = resourceLabels[helpLang(lang)];
  html = html.replace('<!-- INJECT_RESOURCES -->', `<section class="py-16 bg-white dark:bg-dark-bg"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="text-2xl font-bold mb-6"${helpLang(lang) !== lang ? ' lang="en"' : ''}>${escape(labels.title)}</h2><nav class="flex flex-wrap gap-6" aria-label="${escape(labels.title)}">${resourceLinks(lang)}</nav></div></section>`)
    .replace('<!-- INJECT_HELP_LINKS -->', resourceLinks(lang));
  save(home(lang), html, homeVariants);
}
for (const page of pages) {
  const variants = Object.fromEntries(pages.filter(p => p.group === page.group).map(p => [p.lang, p.path]));
  save(page.path, renderArticle(page, { variants, alternates, resourceLinks, resourceLabels, home, escape, json, ORIGIN, PLAY }), variants);
}
record('/privacy/', fs.readFileSync(path.join(__dirname, 'privacy/index.html'), 'utf8'));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable.map(({ url, lastmod, variants }) => `  <url>\n    <loc>${ORIGIN}${url}</loc>\n    <lastmod>${lastmod}</lastmod>${variants ? '\n' + Object.entries({ ...variants, 'x-default': variants.en }).map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${ORIGIN}${href}" />`).join('\n') : ''}\n  </url>`).join('\n')}
</urlset>\n`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Built ${indexable.length} indexable pages. Sitemap dates change only with page content.`);
