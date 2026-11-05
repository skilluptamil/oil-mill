const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const navSection = content.match(/<ul class="navbar-nav[^"]*"[^>]*>([\s\S]*?)<\/ul>/);
  if (navSection) {
    const activeLinks = [...navSection[1].matchAll(/<a[^>]*class="([^"]*active[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
    const summary = activeLinks.map(m => m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
    console.log(file, 'active items:', summary.join(', '));
  }
}

