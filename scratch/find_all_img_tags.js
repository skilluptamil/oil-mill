const fs = require('fs');

const files = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'products.html',
  'process.html',
  'blog.html',
  'blog-details.html',
  'dashboard.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  let idx = 0;
  console.log(`\n=== ${f} ===`);
  while ((match = imgRegex.exec(content)) !== null) {
    idx++;
    console.log(`[${idx}] ${match[0].slice(0, 100)}...`);
  }
});

