const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const templateHTML = fs.readFileSync(templatePath, 'utf8');

// The template has a script block with `const translations = { ... };`
const transMatch = templateHTML.match(/const translations = (\{[\s\S]*?\});\s*\/\/\s*Fallback for minor/);

if (!transMatch) {
    console.error("Could not find translations in template.html");
    process.exit(1);
}

const translationsStr = transMatch[1];
let translations = {};
eval(`translations = ${translationsStr};`);

// Add SEO fields to all languages
const seoDefaults = {
    en: {
        seo_title: "SnapSaver Browser - Best Free Video Downloader & M3U8 Sniffer",
        seo_desc: "SnapSaver is a powerful media sniffer browser for Android. Automatically detect and download m3u8, mp4 videos, music, and images. Private, free, and secure.",
        seo_keywords: "free video downloader, android browser, media sniffer, m3u8 downloader, mp4 downloader, video grabber, privacy browser, SnapSaver",
        seo_h1: "Free Video Downloader & M3U8 Media Sniffer for Android",
        seo_about_title: "Why Choose SnapSaver Video Downloader?",
        seo_about_text: "SnapSaver is the ultimate tool for seamlessly downloading streaming video and media content from across the web. Whether you are dealing with complex HLS/M3U8 streams, standard MP4 files, or high-definition image galleries, our built-in smart sniffer detects the resources instantly. Enjoy blazing-fast download speeds, an integrated file manager, and a secure browsing experience without signing up. Our private browser ensures that no history is left behind."
    },
    "zh-CN": {
        seo_title: "SnapSaver 浏览器 - 免费全能网页视频下载器与M3U8嗅探工具",
        seo_desc: "SnapSaver 安卓浏览器内置强大的媒体视频嗅探器。自动识别网页视频、M3U8直播流媒体与高清图片并一键批量下载。安全、高速、无痕的免费极速浏览器。",
        seo_keywords: "免费视频下载器, 网页视频下载, M3U8嗅探器, MP4下载, 浏览器下载插件, 视频抓取, 媒体嗅探器, SnapSaver",
        seo_h1: "强大免费的安卓视频下载器与网页内容嗅探工具",
        seo_about_title: "为什么选择 SnapSaver 视频下载器？",
        seo_about_text: "SnapSaver 是无缝下载在线网页视频内容的核心利器。无论您需要下载复杂的HLS/m3u8分片流媒体，还是标准的MP4格式视频，或是批量保存高清图集，内置的智能嗅探器都能在网页加载瞬间发现所有资源。无需任何登录，即可享受极速多线程下载体验与私密的安全无痕浏览模式。彻底告别繁琐的下载工具，网页资源极速保存到手机。"
    },
    "zh-HK": {
        seo_title: "SnapSaver 瀏覽器 - 免費全能網頁影片下載器及M3U8嗅探工具",
        seo_desc: "SnapSaver 安卓瀏覽器內置強大的媒體影片嗅探器。自動識別網頁影片、M3U8直播流媒體與高清圖片並一鍵批量下載。安全、高速、無痕的免費極速瀏覽器。",
        seo_keywords: "免費影片下載器, 網頁影片下載, M3U8嗅探器, MP4下載, 瀏覽器下載插件, 影片抓取, 媒體嗅探器, SnapSaver",
        seo_h1: "強大免費的安卓影片下載器與網頁內容嗅探工具",
        seo_about_title: "為甚麼選擇 SnapSaver 影片下載器？",
        seo_about_text: "SnapSaver 是無縫下載在線網頁影片內容的核心利器。無論您需要下載複雜的HLS/m3u8分片流媒體，還是標準的MP4格式影片，或是批量保存高清圖集，內置的智能嗅探器都能在網頁加載瞬間發現所有資源。無需任何登錄，即可享受極速多線程下載體驗與私密的安全無痕瀏覽模式。徹底告別繁瑣的下載工具，網頁資源極速保存到手機。"
    },
    "ja": {
        seo_title: "SnapSaver ブラウザ - 無料の動画ダウンローダー & M3U8スニファー",
        seo_desc: "SnapSaverは強力なメディアスニファー内蔵のAndroidブラウザです。M3U8やMP4の動画、音楽、画像を自動検出してダウンロードします。無料・安全。",
        seo_keywords: "無料動画ダウンローダー, Androidブラウザ, メディアスニファー, M3U8 ダウンロード, MP4 ダウンロード, ビデオグラバー, SnapSaver",
        seo_h1: "Android向け 無料動画ダウンローダー & メディア検出ツール",
        seo_about_title: "SnapSaver 動画ダウンローダーが選ばれる理由",
        seo_about_text: "SnapSaverは、Web上のストリーミング動画やメディアコンテンツをシームレスにダウンロードするための究極のツールです。複雑なHLS/M3U8ストリーム、標準のMP4ファイル、ギャラリーなど、内蔵のスマートスニファーがリソースを瞬時に検出します。超高速のダウンロード、ファイルマネージャー、安全なブラウジングを登録なしでお楽しみいただけます。"
    },
    "es": {
        seo_title: "SnapSaver Browser - Descargador de videos gratuito y sniffer M3U8",
        seo_desc: "SnapSaver es un potente navegador con detector de medios para Android. Detecta y descarga automáticamente videos m3u8, mp4. Privado, gratis y seguro.",
        seo_keywords: "descargador de videos gratis, navegador android, detector de medios, descargar m3u8, descargar mp4, SnapSaver",
        seo_h1: "Descargador de videos gratis y detector de medios para Android",
        seo_about_title: "¿Por qué elegir SnapSaver Video Downloader?",
        seo_about_text: "SnapSaver es la herramienta definitiva para descargar contenido multimedia y videos en streaming. Ya sea que se trate de transmisiones complejas HLS/M3U8 o archivos MP4 estándar, nuestro analizador inteligente los detecta al instante. Disfrute de descargas rápidas y un administrador de archivos sin registrarse."
    },
    "ru": {
        seo_title: "SnapSaver Browser - Бесплатный загрузчик видео и M3U8 Sniffer",
        seo_desc: "SnapSaver — мощный браузер с анализатором медиа для Android. Автоматически находит и скачивает m3u8, mp4 видео, музыку. Бесплатно и безопасно.",
        seo_keywords: "скачать видео бесплатно, браузер для android, m3u8 sniffer, скачать mp4, приватный браузер, SnapSaver",
        seo_h1: "Бесплатный загрузчик видео и медиа-сниффер для Android",
        seo_about_title: "Почему выбирают SnapSaver Video Downloader?",
        seo_about_text: "SnapSaver — идеальный инструмент для загрузки потокового видео. Будь то сложные потоки HLS/M3U8 или файлы MP4, наш умный сниффер мгновенно их обнаруживает. Наслаждайтесь быстрой загрузкой без регистрации."
    }
    // other languages will fallback to EN
};

const langs = Object.keys(translations);
const defaultEn = { ...seoDefaults['en'] };

for (const lang of langs) {
    if (!seoDefaults[lang]) {
        seoDefaults[lang] = { ...defaultEn };
    }
    translations[lang] = { ...translations[lang], ...seoDefaults[lang] };
}

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
        let val = contentObj[key] || translations['en'][key] || "";
        let newTag = fullTag.replace(/content="[^"]*"/, `content="${val}"`);
        return newTag;
    });

    // Add canonical URL based on language if this is a subfolder
    let canonicalVal = lang === 'en' ? "https://snapsaver.suanss.com/" : `https://snapsaver.suanss.com/${lang}/`;
    html = html.replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonicalVal}">`);

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
