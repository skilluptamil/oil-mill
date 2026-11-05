const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const measurementSnippet = `
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
      priceTop: Math.round(price.top),
      btnTop: Math.round(btn.top),
      btnH: Math.round(btn.height),
      btnW: Math.round(btn.width)
    };
  });
  const el = document.createElement('div');
  el.id = 'FINAL_ALIGN_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', measurementSnippet + '</body>');
fs.writeFileSync('temp_verify_final.html', indexHtml, 'utf8');

const widths = [992, 1024, 1100, 1200, 1280, 1366, 1440, 1920];
let allPassed = true;

widths.forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_verify_final.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="FINAL_ALIGN_DATA">([^<]+)</);
  if (m) {
    const list = JSON.parse(m[1]);
    console.log(`\n=== Breakpoint: ${w}px ===`);
    console.table(list);
    
    // Check alignment criteria
    if (w >= 1024) {
      // 4 cards in a single row
      const btnTops = list.map(c => c.btnTop);
      const footerTops = list.map(c => c.footerTop);
      const cardHeights = list.map(c => c.cardH);
      const priceHeights = list.map(c => c.priceH);
      
      const btnAligned = btnTops.every(t => t === btnTops[0]);
      const footerAligned = footerTops.every(t => t === footerTops[0]);
      const heightUniform = cardHeights.every(h => h === cardHeights[0]);
      const priceNoWrap = priceHeights.every(h => h <= 32);
      
      console.log(`[${w}px Check] Button tops aligned: ${btnAligned} (val: ${btnTops[0]}px)`);
      console.log(`[${w}px Check] Footer tops aligned: ${footerAligned} (val: ${footerTops[0]}px)`);
      console.log(`[${w}px Check] Card heights uniform: ${heightUniform} (val: ${cardHeights[0]}px)`);
      console.log(`[${w}px Check] Price single line (no wrap): ${priceNoWrap}`);
      
      if (!btnAligned || !footerAligned || !heightUniform || !priceNoWrap) {
        allPassed = false;
      }
    } else {
      // 2x2 grid at 992px
      const row1BtnAligned = list[0].btnTop === list[1].btnTop;
      const row2BtnAligned = list[2].btnTop === list[3].btnTop;
      console.log(`[${w}px Check] Row 1 button tops aligned: ${row1BtnAligned}`);
      console.log(`[${w}px Check] Row 2 button tops aligned: ${row2BtnAligned}`);
      if (!row1BtnAligned || !row2BtnAligned) allPassed = false;
    }
  }
});

fs.unlinkSync('temp_verify_final.html');

console.log(`\n>>> OVERALL ALIGNMENT VERIFICATION: ${allPassed ? 'PASSED (100% PERFECT)' : 'FAILED'} <<<`);

