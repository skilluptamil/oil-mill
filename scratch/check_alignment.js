const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlSnippet = `
<script>
window.addEventListener('load', () => {
  const cards = Array.from(document.querySelectorAll('section.bg-cream .product-card'));
  const data = cards.map((c, i) => {
    const cardRect = c.getBoundingClientRect();
    const btn = c.querySelector('.btn-enquire-product').getBoundingClientRect();
    const price = c.querySelector('.product-price').getBoundingClientRect();
    const title = c.querySelector('.product-title').getBoundingClientRect();
    const desc = c.querySelector('.product-desc').getBoundingClientRect();
    const sizes = c.querySelector('.product-sizes').getBoundingClientRect();
    const footer = c.querySelector('.product-footer').getBoundingClientRect();
    return {
      card: i + 1,
      cardH: Math.round(cardRect.height),
      titleH: Math.round(title.height),
      descH: Math.round(desc.height),
      sizesTop: Math.round(sizes.top),
      footerTop: Math.round(footer.top),
      priceW: Math.round(price.width),
      priceH: Math.round(price.height),
      btnTop: Math.round(btn.top),
      btnH: Math.round(btn.height),
      btnW: Math.round(btn.width)
    };
  });
  const el = document.createElement('div');
  el.id = 'TEST_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', htmlSnippet + '</body>');
fs.writeFileSync('scratch/test_align.html', indexHtml, 'utf8');

[1024, 1100, 1200, 1280, 1366, 1440].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('scratch/test_align.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="TEST_DATA">([^<]+)</);
  if (m) {
    console.log(`=== Width: ${w}px ===`);
    const list = JSON.parse(m[1]);
    console.table(list);
  }
});

