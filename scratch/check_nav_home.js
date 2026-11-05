const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<a class="nav-link dropdown-toggle[^"]*"[^>]*>([\s\S]*?)<\/a>/);
  if (m) {
    console.log(file, 'dropdown-toggle inner:', m[1].trim().replace(/\s+/g, ' '));
  }
}

