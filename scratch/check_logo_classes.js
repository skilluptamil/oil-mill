const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/<img[^>]*class="([^"]*brand-logo-img[^"]*)"[^>]*>/g)];
  console.log(file, 'has brand-logo-img count:', matches.length);
}

