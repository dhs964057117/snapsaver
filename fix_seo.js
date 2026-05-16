const fs = require('fs');
const path = require('path');

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
        seo_about_text: "SnapSaver 是无缝下载在线网页视频内容的利器。内置的智能嗅探器能在网页加载瞬间发现所有资源。无需任何登录即可享受极速下载。"
    },
    "zh-HK": {
        seo_title: "SnapSaver 瀏覽器 - 免費全能網頁影片下載器及M3U8嗅探工具",
        seo_desc: "SnapSaver 安卓瀏覽器內置強大的媒體影片嗅探器。自動識別網頁影片、M3U8直播流媒體與高清圖片並一鍵批量下載。安全、高速、無痕的免費極速瀏覽器。",
        seo_keywords: "免費影片下載器, 網頁影片下載, M3U8嗅探器, MP4下載, 瀏覽器下載插件, 影片抓取, 媒體嗅探器, SnapSaver",
        seo_h1: "強大免費的安卓影片下載器與網頁內容嗅探工具",
        seo_about_title: "為甚麼選擇 SnapSaver 影片下載器？",
        seo_about_text: "SnapSaver 是無縫下載在線網頁影片內容的利器。內置的智能嗅探器能在網頁加載瞬間發現所有資源。無需任何登錄即可享受極速下載。"
    },
    "ja": {
        seo_title: "SnapSaver ブラウザ - 無料の動画ダウンローダー & M3U8スニファー",
        seo_desc: "SnapSaverは強力なメディアスニファー内蔵のAndroidブラウザです。M3U8やMP4の動画、音楽、画像を自動検出してダウンロードします。無料・安全。",
        seo_keywords: "無料動画ダウンローダー, Androidブラウザ, メディアスニファー, M3U8 ダウンロード, MP4 ダウンロード, ビデオグラバー, SnapSaver",
        seo_h1: "Android向け 無料動画ダウンローダー & メディア検出ツール",
        seo_about_title: "SnapSaver 動画ダウンローダーが選ばれる理由",
        seo_about_text: "SnapSaverは、ストリーミング動画やメディアコンテンツをシームレスにダウンロードするための究極のツールです。内蔵のスニファーがリソースを瞬時に検出します。"
    },
    "es": {
        seo_title: "SnapSaver Browser - Descargador de videos gratuito y sniffer M3U8",
        seo_desc: "SnapSaver es un potente navegador con detector de medios para Android. Detecta y descarga automáticamente videos m3u8, mp4. Privado, gratis y seguro.",
        seo_keywords: "descargador de videos gratis, navegador android, detector de medios, descargar m3u8, descargar mp4, SnapSaver",
        seo_h1: "Descargador de videos gratis y detector de medios para Android",
        seo_about_title: "¿Por qué elegir SnapSaver Video Downloader?",
        seo_about_text: "SnapSaver es la herramienta definitiva para descargar videos en streaming. Nuestro analizador inteligente los detecta al instante. Disfrute de descargas rápidas."
    },
    "ru": {
        seo_title: "SnapSaver Browser - Бесплатный загрузчик видео и M3U8 Sniffer",
        seo_desc: "SnapSaver — мощный браузер с анализатором медиа для Android. Автоматически находит и скачивает m3u8, mp4 видео, музыку. Бесплатно и безопасно.",
        seo_keywords: "скачать видео бесплатно, браузер для android, m3u8 sniffer, скачать mp4, приватный браузер, SnapSaver",
        seo_h1: "Бесплатный загрузчик видео и медиа-сниффер для Android",
        seo_about_title: "Почему выбирают SnapSaver Video Downloader?",
        seo_about_text: "SnapSaver — идеальный инструмент для загрузки потокового видео. Наш умный сниффер мгновенно их обнаруживает. Наслаждайтесь быстрой загрузкой без регистрации."
    }
};

const templatePath = path.join(__dirname, 'template.html');
let templateHTML = fs.readFileSync(templatePath, 'utf8');

// 1. Update translations
const transMatch = templateHTML.match(/const translations = (\{[\s\S]*?\});/);
if (transMatch) {
    const currentTransStr = transMatch[1];
    let translations = {};
    eval(`translations = ${currentTransStr};`);
    
    // Add SEO defaults to the ones missing them (en, zh-CN, zh-HK, ja, es, ru)
    for (const [lang, seoData] of Object.entries(seoDefaults)) {
        if (!translations[lang]) translations[lang] = {};
        translations[lang] = { ...translations[lang], ...seoData };
    }
    
    // Serialize
    const newTransStr = JSON.stringify(translations, null, 12).replace(/"([^"]+)":/g, '"$1":');
    
    templateHTML = templateHTML.replace(transMatch[1], newTransStr);
}

// 2. Fix changeLanguage to support local file testing
const searchString = `            if (window.location.protocol !== 'file:' && currentPath !== newPath && currentPath !== newPath.slice(0, -1)) {
                window.location.href = newPath;
            } else {
                // Just sync Select dropdown
                const select = document.getElementById('lang-select');
                if (select) {
                    if (select.querySelector(\`option[value="\${selectedLang}"]\`)) {
                        select.value = selectedLang;
                    } else {
                        const option = Array.from(select.options).find(opt => opt.value.startsWith(selectedLang));
                        if (option) select.value = option.value;
                    }
                }
            }
        }`;

const replacementString = `            if (window.location.protocol !== 'file:' && currentPath !== newPath && currentPath !== newPath.slice(0, -1)) {
                window.location.href = newPath;
            } else {
                // Just sync Select dropdown
                const select = document.getElementById('lang-select');
                if (select) {
                    if (select.querySelector(\`option[value="\${selectedLang}"]\`)) {
                        select.value = selectedLang;
                    } else {
                        const option = Array.from(select.options).find(opt => opt.value.startsWith(selectedLang));
                        if (option) select.value = option.value;
                    }
                }
                
                // Update DOM text for local testing
                const t = translations[selectedLang] || translations['en'];
                document.documentElement.lang = selectedLang;
                document.querySelectorAll('[data-i18n]').forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (t[key]) el.innerText = t[key];
                });
            }
        }`;

templateHTML = templateHTML.replace(searchString, replacementString);

fs.writeFileSync(templatePath, templateHTML);
console.log("Fixed missing SEO tags and local file testing fallback in template.html");
