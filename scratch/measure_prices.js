const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
<script>
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.product-card');
  const data = Array.from(cards).map((c, i) => {
    const p = c.querySelector('.product-price');
    const btn = c.querySelector('.btn-enquire-product');
    const footer = c.querySelector('.product-footer');
    return {
      card: i + 1,
      footerWidth: footer.offsetWidth,
      priceText: p.innerText.replace(/\\s+/g, ' '),
      priceWidth: p.offsetWidth,
      priceHeight: p.offsetHeight,
      btnWidth: btn.offsetWidth,
      btnHeight: btn.offsetHeight,
      combinedWidth: p.offsetWidth + btn.offsetWidth,
      spaceLeft: footer.offsetWidth - (p.offsetWidth + btn.offsetWidth),
      wrapped: p.offsetHeight > 40
    };
  });
  
  const el = document.createElement('div');
  el.id = 'PRICES';
  el.setAttribute('data-info', JSON.stringify(data));
  document.body.appendChild(el);
});
</script>
`;

let content = fs.readFileSync('index.html', 'utf8')
  .replace(/href="css\//g, 'href="../css/')
  .replace(/src="assets\//g, 'src="../assets/')
  .replace('</body>', script + '</body>');
fs.writeFileSync('scratch/measure_prices.html', content, 'utf8');

const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,1000 "file:///${path.resolve('scratch/measure_prices.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
const m = dom.match(/id="PRICES" data-info="([^"]+)"/);
if (m) {
  console.log(JSON.stringify(JSON.parse(m[1].replace(/&quot;/g, '"')), null, 2));
}

