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
      iconLeft: Math.round(icon.left - cardRect.left),
      cardW: Math.round(cardRect.width),
      h4Top: Math.round(h4.top),
      h4H: Math.round(h4.height),
      pTop: Math.round(p.top),
      pH: Math.round(p.height)
    };
  });
  const el = document.createElement('div');
  el.id = 'TEST_WHY_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Temporarily apply the proposed CSS and classes
const testCss = `
.feature-card {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
}
.feature-card h4 {
  font-size: 1.22rem !important;
  line-height: 1.35 !important;
  min-height: 3.3rem !important;
  margin-bottom: 0.75rem !important;
  color: var(--primary-dark);
}
.feature-card p {
  color: var(--text-muted);
  font-size: 0.92rem !important;
  line-height: 1.6 !important;
  margin-bottom: 0 !important;
  flex-grow: 1 !important;
}
`;

indexHtml = indexHtml.replace('</head>', `<style>${testCss}</style></head>`);

// Make Section 4 cards text-center with mx-auto
const s4Start = indexHtml.indexOf('<!-- SECTION 4: WHY CHOOSE US');
const s4End = indexHtml.indexOf('<!-- SECTION 5: OUR MANUFACTURING PROCESS');
let s4Content = indexHtml.substring(s4Start, s4End);
s4Content = s4Content.replace(/class="feature-card"/g, 'class="feature-card text-center"');
s4Content = s4Content.replace(/class="feature-icon-wrapper"/g, 'class="feature-icon-wrapper mx-auto"');
indexHtml = indexHtml.substring(0, s4Start) + s4Content + indexHtml.substring(s4End);

indexHtml = indexHtml.replace('</body>', measurementSnippet + '</body>');
fs.writeFileSync('temp_test_measure_why.html', indexHtml, 'utf8');

[1440, 1366, 1280, 1200, 1024, 992].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_test_measure_why.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="TEST_WHY_DATA">([^<]+)</);
  if (m) {
    console.log(`\n=== Width: ${w}px ===`);
    const list = JSON.parse(m[1]);
    console.table(list);
  }
});

fs.unlinkSync('temp_test_measure_why.html');

