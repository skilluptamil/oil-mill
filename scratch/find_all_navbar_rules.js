const fs = require('fs');

const files = ['css/style.css', 'css/responsive.css', 'css/dark-mode.css', 'css/rtl.css'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n=== ${file} ===`);
  lines.forEach((l, i) => {
    if (l.includes('.navbar') || l.includes('.site-header') || l.includes('.nav-link') || l.includes('.navbar-brand') || l.includes('.navbar-actions')) {
      console.log(`${i + 1}: ${l}`);
    }
  });
}

