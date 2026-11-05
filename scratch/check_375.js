const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlSnippet = `
<script>
window.addEventListener('load', () => {
  const c = document.querySelector('section.bg-cream .container');
  const card = document.querySelector('section.bg-cream .product-card');
  const body = document.querySelector('section.bg-cream .product-body');
  const footer = document.querySelector('section.bg-cream .product-footer');
  const btn = document.querySelector('section.bg-cream .btn-enquire-product');
  const price = document.querySelector('section.bg-cream .product-price');
  
  const data = {
    windowW: window.innerWidth,
    containerW: c.getBoundingClientRect().width,
    cardW: card.getBoundingClientRect().width,
    bodyW: body.getBoundingClientRect().width,
    footerW: footer.getBoundingClientRect().width,
    priceW: price.getBoundingClientRect().width,
    btnW: btn.getBoundingClientRect().width,
    btnRight: btn.getBoundingClientRect().right,
    cardRight: card.getBoundingClientRect().right,
    docW: document.documentElement.scrollWidth
  };
  const el = document.createElement('div');
  el.id = 'DIM_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', htmlSnippet + '</body>');
fs.writeFileSync('temp_test_375.html', indexHtml, 'utf8');

const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=375,900 "file:///${path.resolve('temp_test_375.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
const m = dom.match(/id="DIM_DATA">([^<]+)</);
if (m) {
  console.log('Original index.html at 375px:');
  console.log(JSON.parse(m[1]));
}

fs.unlinkSync('temp_test_375.html');

