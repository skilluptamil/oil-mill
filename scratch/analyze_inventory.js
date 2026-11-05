const fs = require('fs');
const inv = JSON.parse(fs.readFileSync('scratch/image_inventory.json', 'utf8'));

console.log('--- Unique Sources ---');
const srcMap = {};
inv.html.forEach(item => {
  if (item.src.includes('logo')) return; // skip logos
  if (!srcMap[item.src]) srcMap[item.src] = [];
  srcMap[item.src].push({ file: item.file, alt: item.alt, snippet: item.snippet });
});

console.log('Total non-logo images used:', Object.keys(srcMap).length);
for (const [src, usages] of Object.entries(srcMap)) {
  console.log(`\nURL: ${src} (used ${usages.length} times)`);
  usages.forEach(u => console.log(`  - [${u.file}] alt="${u.alt}"`));
}

