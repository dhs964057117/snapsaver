const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../dist');
const source = path.resolve(__dirname, '..');
const origin = 'https://snapsaver.suanss.com';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const links = html => [...html.matchAll(/<(?:link|a|img|script)\b[^>]*>/g)].map(m => attributes(m[0]));
const resolveFile = pathname => path.join(root, pathname.replace(/^\//, ''), pathname.endsWith('/') ? 'index.html' : '');
const htmlByUrl = new Map(urls.map(url => [url, fs.readFileSync(resolveFile(new URL(url).pathname), 'utf8')]));
const titles = new Set();
for (const [url, html] of htmlByUrl) {
  const head = html.split('</head>')[0];
  const canonical = links(head).filter(l => l.rel === 'canonical');
  assert.equal(canonical.length, 1, `${url}: exactly one canonical`);
  assert.equal(canonical[0].href, url, `${url}: self canonical`);
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `${url}: unique nonempty title`);
  titles.add(title);
  const description = [...head.matchAll(/<meta\b[^>]*>/g)].map(m => attributes(m[0])).find(m => m.name === 'description');
  assert.ok(description?.content, `${url}: description in initial HTML`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${url}: one H1`);
  assert.ok(!/content="[^"]*noindex/.test(head), `${url}: indexable`);
  assert.ok(!/INJECT_|cdn\.tailwindcss\.com|navigator\.language|isBot|const translations/.test(html), `${url}: no runtime rendering dependency or automatic redirect`);
  for (const script of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
  const locale = html.match(/<html lang="([^"]+)"/)?.[1];
  const alternates = links(head).filter(l => l.rel === 'alternate');
  if (alternates.length) assert.ok(alternates.some(l => l.hreflang === locale && l.href === url), `${url}: self hreflang`);
  for (const alternate of alternates) {
    const target = htmlByUrl.get(alternate.href);
    assert.ok(target, `${url}: hreflang target exists ${alternate.href}`);
    assert.ok(links(target.split('</head>')[0]).some(l => l.hreflang === locale && l.href === url), `${url}: reciprocal hreflang from ${alternate.href}`);
    if (alternate.hreflang !== 'x-default') assert.equal(target.match(/<html lang="([^"]+)"/)?.[1], alternate.hreflang);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const link of links(html)) {
    const href = link.href || link.src;
    if (!href || /^(data:|mailto:|tel:)/.test(href)) continue;
    const target = new URL(href, url);
    if (target.origin !== origin) continue;
    assert.ok(fs.existsSync(resolveFile(target.pathname)), `${url}: missing local resource ${href}`);
    if (target.href.split('#')[0] === url && target.hash) assert.ok(ids.has(decodeURIComponent(target.hash.slice(1))), `${url}: missing anchor ${href}`);
  }
}
assert.equal(new Set(urls).size, urls.length, 'No duplicate sitemap URLs');
assert.ok(/noindex/.test(fs.readFileSync(path.join(root, '404.html'), 'utf8')), '404 is noindex');
assert.ok(fs.statSync(path.join(root, 'assets/site.css')).size > 1000, 'Compiled CSS exists');
assert.ok(fs.statSync(path.join(root, 'assets/site.js')).size < 5000, 'Small progressive enhancement script');
for (const name of ['template.html', 'build.js', 'translations.json', 'incubator', '.mimocode', 'node_modules']) {
  assert.ok(!fs.existsSync(path.join(root, name)), `Source files must not be published: ${name}`);
}
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!/^Disallow:\s*\/$/m.test(robots));
// Verify accurate sitemap dates survive an unchanged rebuild.
const before = fs.readFileSync(path.join(source, 'seo-manifest.json'), 'utf8');
require('node:child_process').execFileSync(process.execPath, [path.join(source, 'build.js')], { cwd: source });
assert.equal(fs.readFileSync(path.join(source, 'seo-manifest.json'), 'utf8'), before, 'Rebuild must not change lastmod without content changes');
console.log(`PASS: ${urls.length} pages; metadata, JSON-LD, reciprocal hreflang, local links/assets, 404, sitemap, stable dates, and deployment file allowlist.`);
