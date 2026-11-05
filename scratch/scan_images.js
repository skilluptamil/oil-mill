const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const cssFiles = fs.readdirSync('css').filter(f => f.endsWith('.css')).map(f => path.join('css', f));

console.log('--- Analyzing HTML files ---');
const allHtmlImages = [];

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all img tags
  const imgMatches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
  imgMatches.forEach(m => {
    // extract alt if any
    const altMatch = m[0].match(/alt=["']([^"']*)["']/i);
    allHtmlImages.push({
      file,
      tag: 'img',
      src: m[1],
      alt: altMatch ? altMatch[1] : '',
      snippet: m[0].substring(0, 100)
    });
  });

  // Find inline style background-image
  const bgMatches = [...content.matchAll(/style=["'][^"']*url\(['"]?([^'"\)]+)['"]?\)[^"']*["']/gi)];
  bgMatches.forEach(m => {
    allHtmlImages.push({
      file,
      tag: 'inline-bg',
      src: m[1],
      alt: '',
      snippet: m[0].substring(0, 100)
    });
  });
}

console.log('Total HTML image usages:', allHtmlImages.length);

console.log('\n--- Analyzing CSS files ---');
const allCssImages = [];
for (const file of cssFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const bgMatches = [...content.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/gi)];
  bgMatches.forEach(m => {
    if (!m[1].includes('font') && !m[1].startsWith('data:')) {
      allCssImages.push({
        file,
        src: m[1]
      });
    }
  });
}
console.log('Total CSS image usages:', allCssImages.length);

fs.writeFileSync('scratch/image_inventory.json', JSON.stringify({ html: allHtmlImages, css: allCssImages }, null, 2), 'utf8');
console.log('Saved to scratch/image_inventory.json');

