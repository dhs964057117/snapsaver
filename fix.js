const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
let templateHTML = fs.readFileSync(templatePath, 'utf8');

// Read the new translations
const newLangs = JSON.parse(fs.readFileSync(path.join(__dirname, 'langs.json'), 'utf8'));

// 1. Update template.html
// Extract the current translations
const transMatch = templateHTML.match(/const translations = (\{[\s\S]*?\});\s*\/\/\s*Fallback for minor/);
if (transMatch) {
    const currentTransStr = transMatch[1];
    let translations = {};
    eval(`translations = ${currentTransStr};`);
    
    // Merge new langs
    for (const [lang, data] of Object.entries(newLangs)) {
        if (!translations[lang]) translations[lang] = {};
        translations[lang] = { ...translations[lang], ...data };
    }
    
    // Serialize
    const newTransStr = JSON.stringify(translations, null, 12).replace(/"([^"]+)":/g, '"$1":');
    
    templateHTML = templateHTML.replace(transMatch[1], newTransStr);
    
    // Remove the minorLangs fallback
    templateHTML = templateHTML.replace(/\/\/ Fallback for minor missing keys[\s\S]*?\}\);/m, '// Minor langs fallback removed because all langs now have translations.');
    
    fs.writeFileSync(templatePath, templateHTML);
    console.log("Updated template.html with full translations.");
} else {
    console.log("Could not find translations block in template.html");
}

// 2. Update build.js
let buildJs = fs.readFileSync(path.join(__dirname, 'build.js'), 'utf8');

// Replace the seoDefaults block and loop
// Instead of hardcoding seoDefaults, build.js should just use the translations object, because now ALL SEO data is IN the translations object!
const newBuildLogic = `// Added SEO fields directly via template.html translations
// Generate hreflang tags for ALL supported languages`;

buildJs = buildJs.replace(/\/\/ Add SEO fields to all languages[\s\S]*?\/\/ Generate hreflang tags for ALL supported languages/, newBuildLogic);

fs.writeFileSync(path.join(__dirname, 'build.js'), buildJs);
console.log("Updated build.js to use native translations.");
