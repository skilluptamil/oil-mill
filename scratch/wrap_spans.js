const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  const links = ['About Us', 'Services', 'Pricing', 'Blog', 'Contact Us'];
  for (const text of links) {
    // If not already inside span
    const reg = new RegExp(`(<a class="nav-link[^"]*"[^>]*>)\\s*${text}\\s*(<\\/a>)`, 'g');
    if (reg.test(content)) {
      content = content.replace(reg, `$1<span>${text}</span>$2`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
}

console.log('Wrapped nav link text in span in', count, 'files');

