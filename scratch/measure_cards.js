const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const measureScript = `
<script>
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.product-card');
  const cardData = Array.from(cards).map((c, i) => {
    const cr = c.getBoundingClientRect();
    const title = c.querySelector('.product-title');
    const desc = c.querySelector('.product-desc');
    const sizes = c.querySelector('.product-sizes');
    const footer = c.querySelector('.product-footer');
    const btn = c.querySelector('.btn-enquire-product');
    const price = c.querySelector('.product-price');
    
    return {
      index: i + 1,
      cardTop: Math.round(cr.top),
      cardBottom: Math.round(cr.bottom),
      cardHeight: Math.round(cr.height),
      titleHeight: title ? Math.round(title.getBoundingClientRect().height) : null,
      descHeight: desc ? Math.round(desc.getBoundingClientRect().height) : null,
      sizesTop: sizes ? Math.round(sizes.getBoundingClientRect().top) : null,
      footerTop: footer ? Math.round(footer.getBoundingClientRect().top) : null,
      footerBottom: footer ? Math.round(footer.getBoundingClientRect().bottom) : null,
      btnTop: btn ? Math.round(btn.getBoundingClientRect().top) : null,
      btnBottom: Math.round(btn.getBoundingClientRect().bottom),
      btnHeight: Math.round(btn.getBoundingClientRect().height),
      priceTop: Math.round(price.getBoundingClientRect().top),
      priceBottom: Math.round(price.getBoundingClientRect().bottom)
    };
  });
  
  const tag = document.createElement('div');
  tag.id = 'MEASURE_RESULT';
  tag.setAttribute('data-info', JSON.stringify(cardData));
  document.body.appendChild(tag);
});
</script>
`;

let content = fs.readFileSync('index.html', 'utf8')
  .replace(/href="css\//g, 'href="../css/')
  .replace(/src="assets\//g, 'src="../assets/')
  .replace('</body>', measureScript + '</body>');
fs.writeFileSync('scratch/measure_cards.html', content, 'utf8');

const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --dump-dom --window-size=1280,1400 "file:///${path.resolve('scratch/measure_cards.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
const m = dom.match(/id="MEASURE_RESULT" data-info="([^"]+)"/);
if (m) {
  console.log(JSON.stringify(JSON.parse(m[1].replace(/&quot;/g, '"')), null, 2));
} else {
  console.log('No measure result found');
}
