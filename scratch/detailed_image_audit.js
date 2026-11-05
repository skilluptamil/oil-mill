const fs = require('fs');

const pages = [
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

const report = {};

for (const page of pages) {
  if (!fs.existsSync(page)) continue;
  const content = fs.readFileSync(page, 'utf8');
  
  // Extract images with surrounding heading context
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  report[page] = [];
  
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.includes('logo')) continue; // Skip brand logo
    
    // Find preceding heading within 1500 characters
    const startIndex = Math.max(0, match.index - 1500);
    const precedingText = content.substring(startIndex, match.index);
    const headingMatches = [...precedingText.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)];
    const lastHeading = headingMatches.length > 0 ? headingMatches[headingMatches.length - 1][2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'None';
    
    // Find alt attribute
    const altMatch = match[0].match(/alt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : '';

    report[page].push({
      src,
      alt,
      heading: lastHeading,
      imgTag: match[0]
    });
  }

  // Also check inline CSS background-image
  const bgRegex = /style=["'][^"']*url\(['"]?([^'"\)]+)['"]?\)[^"']*["']/gi;
  while ((match = bgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.includes('logo')) continue;
    report[page].push({
      src,
      alt: 'inline-bg',
      heading: 'Background',
      imgTag: match[0]
    });
  }
}

fs.writeFileSync('scratch/page_image_report.json', JSON.stringify(report, null, 2), 'utf8');
console.log('Report generated in scratch/page_image_report.json');

for (const [page, imgs] of Object.entries(report)) {
  console.log(`\n=== ${page} (${imgs.length} images) ===`);
  imgs.forEach((img, i) => {
    console.log(`  ${i+1}. [Heading: "${img.heading}"] [Alt: "${img.alt}"] -> ${img.src.substring(0, 70)}...`);
  });
}

