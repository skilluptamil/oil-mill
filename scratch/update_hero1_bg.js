const fs = require('fs');

// 1. Update style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');
styleCss = styleCss.replace(
  /(\.hero-home-1\s*\{[^}]*url\(['"]https:\/\/images\.unsplash\.com\/)(photo-[^"'\?]+)(\?[^'"]+['"]\))/s,
  `$1photo-1500937386664-56d1dfef3854$3`
);
fs.writeFileSync('css/style.css', styleCss, 'utf8');

// 2. Update dark-mode.css
let darkCss = fs.readFileSync('css/dark-mode.css', 'utf8');
darkCss = darkCss.replace(
  /(\[data-theme="dark"\]\s+\.hero-home-1\s*\{[^}]*url\(['"]https:\/\/images\.unsplash\.com\/)(photo-[^"'\?]+)(\?[^'"]+['"]\))/s,
  `$1photo-1500937386664-56d1dfef3854$3`
);
fs.writeFileSync('css/dark-mode.css', darkCss, 'utf8');

console.log('Updated hero-home-1 background in style.css and dark-mode.css!');

