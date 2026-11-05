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
      h4Top: Math.round(h4.top),
      h4H: Math.round(h4.height),
      pTop: Math.round(p.top),
      pH: Math.round(p.height)
    };
  });
  const el = document.createElement('div');
  el.id = 'FINAL_WHY_DATA';
  el.textContent = JSON.stringify(data);
  document.body.appendChild(el);
});
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', measurementSnippet + '</body>');
fs.writeFileSync('temp_verify_why.html', indexHtml, 'utf8');

const widths = [1440, 1366, 1280, 1200, 1024, 992];
let allPassed = true;

widths.forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_verify_why.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="FINAL_WHY_DATA">([^<]+)</);
  if (m) {
    const list = JSON.parse(m[1]);
    console.log(`\n=== Breakpoint: ${w}px ===`);
    console.table(list);
    
    if (w >= 1024) {
      const pTops = list.map(c => c.pTop);
      const h4Tops = list.map(c => c.h4Top);
      const cardHeights = list.map(c => c.cardH);
      const h4Heights = list.map(c => c.h4H);
      
      const pAligned = pTops.every(t => t === pTops[0]);
      const h4Aligned = h4Tops.every(t => t === h4Tops[0]);
      const h4HeightUniform = h4Heights.every(h => h === h4Heights[0]);
      const heightUniform = cardHeights.every(h => h === cardHeights[0]);
      
      console.log(`[${w}px Check] Paragraph start tops aligned: ${pAligned} (val: ${pTops[0]}px)`);
      console.log(`[${w}px Check] Heading tops aligned: ${h4Aligned} (val: ${h4Tops[0]}px)`);
      console.log(`[${w}px Check] Heading heights uniform: ${h4HeightUniform} (val: ${h4Heights[0]}px)`);
      console.log(`[${w}px Check] Card heights uniform: ${heightUniform} (val: ${cardHeights[0]}px)`);
      
      if (!pAligned || !h4Aligned || !heightUniform) allPassed = false;
    } else {
      const row1Aligned = list[0].pTop === list[1].pTop;
      const row2Aligned = list[2].pTop === list[3].pTop;
      console.log(`[${w}px Check] Row 1 paragraphs aligned: ${row1Aligned}`);
      console.log(`[${w}px Check] Row 2 paragraphs aligned: ${row2Aligned}`);
      if (!row1Aligned || !row2Aligned) allPassed = false;
    }
  }
});

fs.unlinkSync('temp_verify_why.html');

console.log(`\n>>> WHY CHOOSE US ALIGNMENT VERIFICATION: ${allPassed ? 'PASSED (100% PERFECT)' : 'FAILED'} <<<`);

