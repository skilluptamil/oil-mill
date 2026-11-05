const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

let openBraces = 0;
const lines = css.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Strip comments and strings roughly
  const cleaned = line.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const ch of cleaned) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
  }
  if (i >= 180 && i <= 430) {
    console.log(`Line ${i + 1} (open: ${openBraces}): ${line.substring(0, 60)}`);
  }
}

console.log('Final open braces:', openBraces);

