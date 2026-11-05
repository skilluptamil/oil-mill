const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<a class="navbar-brand[^"]*"[^>]*>([\s\S]*?)<\/a>/);
  if (m) {
    console.log(file, 'brand:', m[1].trim().replace(/\s+/g, ' '));
  }
}

