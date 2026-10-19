const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const target = path.join(root, 'dist');
// Clean only this build's dedicated output directory after checking the resolved path.
if (path.dirname(target) !== root || path.basename(target) !== 'dist') throw new Error('Unsafe output directory');
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'seo-manifest.json'), 'utf8'));
const files = [
  ...Object.keys(manifest).map(url => `${url.slice(1)}index.html`),
  '404.html', 'robots.txt', 'sitemap.xml', 'app-ads.txt', 'favicon.svg',
  'assets/site.css', 'assets/site.js',
  'browse-web-fast.jpg', 'find-download.jpg', 'manage-play.jpg', 'preview-image.jpg'
];
for (const file of files) {
  const output = path.join(target, file);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(path.join(root, file), output);
}
console.log(`Packaged ${files.length} public files in dist/. Source scripts and unrelated projects are excluded.`);
