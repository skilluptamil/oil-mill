const fs = require('fs');

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

let allOk = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const links = content.match(/<a[^>]+class="footer-social-link"[^>]*>/g) || [];
  if (links.length !== 4) {
    console.error(`[FAIL] ${f}: Expected 4 footer-social-links, got ${links.length}`);
    allOk = false;
    return;
  }
  
  const hasFb = links.some(l => l.includes('facebook.com') && l.includes('target="_blank"'));
  const hasIg = links.some(l => l.includes('instagram.com') && l.includes('target="_blank"'));
  const hasYt = links.some(l => l.includes('youtube.com') && l.includes('target="_blank"'));
  const hasWa = links.some(l => l.includes('wa.me') && l.includes('target="_blank"'));
  
  if (hasFb && hasIg && hasYt && hasWa) {
    console.log(`[PASS] ${f}: All 4 social links verified with target="_blank"`);
  } else {
    console.error(`[FAIL] ${f}: Missing one of FB/IG/YT/WA links`);
    allOk = false;
  }
});

console.log(`\nVerification: ${allOk ? 'ALL PASS' : 'FAILURES OCCURRED'}`);

