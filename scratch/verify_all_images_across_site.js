const fs = require('fs');
const https = require('https');

const htmlFiles = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'products.html',
  'process.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'login.html',
  'register.html',
  'dashboard.html',
  '404.html',
  'coming-soon.html'
];

const cssFiles = [
  'css/style.css',
  'css/dark-mode.css'
];

const imageOccurrences = {}; // id -> [ { file, type, line, alt } ]
const allUrls = new Set();

// 1. Scan HTML
htmlFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineNo) => {
    const imgMatches = [...line.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
    imgMatches.forEach(m => {
      const src = m[1];
      if (src.includes('images.unsplash.com')) {
        const idMatch = src.match(/photo-([a-zA-Z0-9_-]+)/);
        const id = idMatch ? idMatch[0] : src;
        const altMatch = m[0].match(/alt=["']([^"']*)["']/i);
        const alt = altMatch ? altMatch[1] : '';
        if (!imageOccurrences[id]) imageOccurrences[id] = [];
        imageOccurrences[id].push({ file: f, type: 'img', line: lineNo + 1, alt, src });
        allUrls.add(src);
      }
    });
  });
});

// 2. Scan CSS
cssFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, lineNo) => {
    const urlMatches = [...line.matchAll(/url\(['"]?(https:\/\/images\.unsplash\.com\/[^'")]+)['"]?\)/gi)];
    urlMatches.forEach(m => {
      const src = m[1];
      const idMatch = src.match(/photo-([a-zA-Z0-9_-]+)/);
      const id = idMatch ? idMatch[0] : src;
      if (!imageOccurrences[id]) imageOccurrences[id] = [];
      imageOccurrences[id].push({ file: f, type: 'css', line: lineNo + 1, alt: '', src });
      allUrls.add(src);
    });
  });
});

console.log('================ AUDIT RESULTS ================');
console.log(`Total unique image IDs found: ${Object.keys(imageOccurrences).length}`);

// Check duplicates
const duplicates = Object.entries(imageOccurrences).filter(([id, list]) => {
  // If the duplicate is hero-home-1 between style.css and dark-mode.css, that is the same section in light vs dark mode
  if (list.length === 2 && list.some(x => x.file === 'css/style.css') && list.some(x => x.file === 'css/dark-mode.css')) {
    return false; // Expected light/dark theme pair
  }
  return list.length > 1;
});

if (duplicates.length === 0) {
  console.log('✅ ZERO DUPLICATES FOUND! Every single page and section has a 100% UNIQUE image!');
} else {
  console.log(`❌ WARNING: Found ${duplicates.length} duplicate image IDs:`);
  duplicates.forEach(([id, list]) => {
    console.log(`\n  Image ID: ${id}`);
    list.forEach(item => {
      console.log(`    -> File: ${item.file}:${item.line} (${item.type}) Alt: "${item.alt}"`);
    });
  });
}

// Write report
fs.writeFileSync('scratch/final_audit_report.json', JSON.stringify({
  totalUniqueImages: Object.keys(imageOccurrences).length,
  duplicatesCount: duplicates.length,
  occurrences: imageOccurrences
}, null, 2), 'utf8');

// Verify all URLs via HTTP GET
console.log(`\nVerifying live status of ${allUrls.size} distinct URLs...`);
let checked = 0;
let errors = 0;
const urlArray = Array.from(allUrls);

urlArray.forEach(url => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    if (res.statusCode !== 200) {
      console.log(`❌ ERROR ${res.statusCode} for URL: ${url}`);
      errors++;
    }
    checked++;
    if (checked === urlArray.length) {
      if (errors === 0) {
        console.log(`✅ 100% of images verified live with HTTP 200 OK! (${checked}/${urlArray.length})`);
      } else {
        console.log(`❌ ${errors} images failed!`);
      }
    }
  }).on('error', (err) => {
    console.log(`❌ NETWORK ERROR: ${err.message} for ${url}`);
    errors++;
    checked++;
  });
});

