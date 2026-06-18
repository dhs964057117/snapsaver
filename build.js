const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const templateHTML = fs.readFileSync(templatePath, 'utf8');

// The template has a script block with `const translations = { ... };`
// Match the translations object. Since it's the only one, we can match up to the end of the object.
const transMatch = templateHTML.match(/const translations = (\{[\s\S]*?\});\s*\/\/\s*Minor langs fallback removed/);

if (!transMatch) {
    console.error("Could not find translations in template.html");
    process.exit(1);
}

const translationsStr = transMatch[1];
let translations = {};
eval(`translations = ${translationsStr};`);

const langs = Object.keys(translations);

// Added SEO fields directly via template.html translations
// Generate hreflang tags for ALL supported languages
let hreflangTags = langs.map(lang => {
    let urlPath = lang === 'en' ? '' : `${lang}/`;
    return `<link rel="alternate" hreflang="${lang}" href="https://snapsaver.suanss.com/${urlPath}" />`;
}).join('\n    ');
// Add x-default
hreflangTags += `\n    <link rel="alternate" hreflang="x-default" href="https://snapsaver.suanss.com/" />`;

function buildPage(lang, contentObj) {
    let html = templateHTML;

    // Inject hreflang
    html = html.replace('<!-- INJECT_HREFLANG -->', hreflangTags);

    // Update <html lang="en">
    html = html.replace(/<html lang="[^"]+"/, `<html lang="${lang}"`);
    
    // Process tags with data-i18n="xxx"
    // Using a reliable manual split/replace or regex over the DOM string.
    // Instead of innerText, we are replacing everything between > and <
    html = html.replace(/(<[^>]+data-i18n="([^"]+)"[^>]*>)([\s\S]*?)(?=<\/[a-zA-Z0-9]+>)/g, (match, openTag, key, innerContent) => {
        let val = contentObj[key] || translations['en'][key] || "";
        return openTag + val;
    });

    // Handle the <title data-i18n-seo="seo_title">
    html = html.replace(/(<title data-i18n-seo="seo_title">)([^<]*)(<\/title>)/g, (match, openTag, text, closeTag) => {
        return openTag + (contentObj['seo_title'] || translations['en']['seo_title']) + closeTag;
    });

    // Handle meta tags with data-i18n-seo
    html = html.replace(/(<meta[^>]+data-i18n-seo="([^"]+)"[^>]*>)/g, (match, fullTag, key) => {
        // Need to replace the content="..." attribute from fullTag
        // Fallback: og_title -> seo_title, og_desc -> seo_desc, twitter_title -> seo_title, twitter_desc -> seo_desc
        let fallbackKey = key;
        if (key === 'og_title' || key === 'twitter_title') fallbackKey = 'seo_title';
        if (key === 'og_desc' || key === 'twitter_desc') fallbackKey = 'seo_desc';
        let val = contentObj[key] || contentObj[fallbackKey] || translations['en'][key] || translations['en'][fallbackKey] || "";
        let newTag = fullTag.replace(/content="[^"]*"/, `content="${val}"`);
        return newTag;
    });

    // Handle JSON-LD script tag with data-i18n-seo="json_ld"
    html = html.replace(/(<script type="application\/ld\+json"[^>]*>)([\s\S]*?)(<\/script>)/g, (match, openTag, jsonContent, closeTag) => {
        // Extract and localize the description field in JSON-LD
        let localizedDesc = contentObj['seo_desc'] || translations['en']['seo_desc'] || "";
        let localizedUrl = lang === 'en' ? "https://snapsaver.suanss.com/" : `https://snapsaver.suanss.com/${lang}/`;
        let newJson = jsonContent
            .replace(/"description":\s*"[^"]*"/, `"description": "${localizedDesc}"`)
            .replace(/"url":\s*"https:\/\/snapsaver\.suanss\.com\/"/, `"url": "${localizedUrl}"`);
        return openTag + newJson + closeTag;
    });

    // Add canonical URL based on language if this is a subfolder
    let canonicalVal = lang === 'en' ? "https://snapsaver.suanss.com/" : `https://snapsaver.suanss.com/${lang}/`;
    html = html.replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonicalVal}">`);

    // Update og:url and twitter:url to match canonical
    html = html.replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${canonicalVal}">`);
    html = html.replace(/<meta name="twitter:url" content="[^"]+">/, `<meta name="twitter:url" content="${canonicalVal}">`);

    return html;
}

// Generate files
function writeHTML(langPath, htmlContent) {
    const fullDir = path.join(__dirname, langPath);
    if (!fs.existsSync(fullDir)) {
        fs.mkdirSync(fullDir, { recursive: true });
    }
    fs.writeFileSync(path.join(fullDir, 'index.html'), htmlContent);
    console.log(`Generated HTML for ${langPath || 'root'}`);
}

// Ensure the EN build goes to root index.html
writeHTML('', buildPage('en', translations['en']));

// Generate subfolders for each language
for (const lang of langs) {
    if (lang === 'en') continue;
    writeHTML(lang, buildPage(lang, translations[lang]));
}

console.log("Build complete.");
