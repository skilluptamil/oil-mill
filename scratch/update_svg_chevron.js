const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const svgChevron = `<span>Home</span>
                <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>`;

let updated = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<i class="bi bi-chevron-down dropdown-arrow"></i>')) {
    content = content.replace(/<span>Home<\/span>\s*<i class="bi bi-chevron-down dropdown-arrow"><\/i>/g, svgChevron);
    fs.writeFileSync(file, content, 'utf8');
    updated++;
  }
}

console.log('Updated SVG chevron in', updated, 'files');

