const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const measurementSnippet = `
<script>
window.addEventListener('load', () => {
  const cards = Array.from(document.querySelectorAll('.feature-card')).slice(0, 4);
  const data = cards.map((c, i) => {
    const cardRect = c.getBoundingClientRect();
    const icon = c.querySelector('.feature-icon-wrapper').getBoundingClientRect();
    const h4 = c.querySelector('h4').getBoundingClientRect();
    const p = c.querySelector('p').getBoundingClientRect();
    return {
      card: i + 1,
      cardH: Math.round(cardRect.height),
      iconTop: Math.round(icon.top),
      iconH: Math.round(icon.height),
      h4Text: c.querySelector('h4').innerText,
      h4Top: Math.round(h4.top),
      h4H: Math.round(h4.height),
      pTop: Math.round(p.top),
      pH: Math.round(p.height)
    };
  });
  const el = document.createElement('div');
  el.id = 'WHY_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', measurementSnippet + '</body>');
fs.writeFileSync('temp_test_why.html', indexHtml, 'utf8');

[1440, 1366, 1280, 1200, 1024].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_test_why.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="WHY_DATA">([^<]+)</);
  if (m) {
    console.log(`\n=== Width: ${w}px ===`);
    const list = JSON.parse(m[1]);
    console.table(list);
  }
});

fs.unlinkSync('temp_test_why.html');

