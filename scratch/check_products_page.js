const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlSnippet = `
<script>
window.addEventListener('load', () => {
  const cards = Array.from(document.querySelectorAll('.product-card'));
  const data = cards.map((c, i) => {
    const cardRect = c.getBoundingClientRect();
    const btn = c.querySelector('.btn-enquire-product')?.getBoundingClientRect();
    const price = c.querySelector('.product-price')?.getBoundingClientRect();
    const title = c.querySelector('.product-title')?.getBoundingClientRect();
    const desc = c.querySelector('.product-desc')?.getBoundingClientRect();
    const sizes = c.querySelector('.product-sizes')?.getBoundingClientRect();
    const footer = c.querySelector('.product-footer')?.getBoundingClientRect();
    return {
      card: i + 1,
      cardH: Math.round(cardRect.height),
      titleH: title ? Math.round(title.height) : 0,
      descH: desc ? Math.round(desc.height) : 0,
      footerTop: footer ? Math.round(footer.top) : 0,
      priceH: price ? Math.round(price.height) : 0,
      btnTop: btn ? Math.round(btn.top) : 0,
      btnH: btn ? Math.round(btn.height) : 0,
      btnW: btn ? Math.round(btn.width) : 0
    };
  });
  const el = document.createElement('div');
  el.id = 'TEST_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let prodHtml = fs.readFileSync('products.html', 'utf8');
prodHtml = prodHtml.replace('</body>', htmlSnippet + '</body>');
fs.writeFileSync('temp_test_prod.html', prodHtml, 'utf8');

[1280, 1024, 768].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_test_prod.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="TEST_DATA">([^<]+)</);
  if (m) {
    console.log(`=== Products.html Width: ${w}px ===`);
    const list = JSON.parse(m[1]);
    console.table(list);
  }
});

fs.unlinkSync('temp_test_prod.html');

