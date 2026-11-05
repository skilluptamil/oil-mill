const fs = require('fs');
const path = require('path');

const files = [
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
  'coming-soon.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const count = (content.match(/footer-social-link/g) || []).length;
  console.log(`${f}: ${count} social links found`);
});

