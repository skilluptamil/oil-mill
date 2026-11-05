const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const m = content.match(/<a class="nav-link[^"]*active[^"]*"[^>]*>([\s\S]*?)<\/a>/);
  if (m) {
    console.log(file, '-> active nav-link:', m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  } else {
    console.log(file, '-> NO active nav-link');
  }
}

