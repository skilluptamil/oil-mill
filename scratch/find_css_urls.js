const fs = require('fs');
['css/style.css', 'css/dark-mode.css'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/url\(['"]?([^'")]+)['"]?\)/g);
  console.log(f, matches);
});

