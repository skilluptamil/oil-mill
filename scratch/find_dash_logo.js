const fs = require('fs');
const content = fs.readFileSync('dashboard.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('logo') || l.includes('Vaagai')) {
    console.log(i + 1, l.trim());
  }
});

