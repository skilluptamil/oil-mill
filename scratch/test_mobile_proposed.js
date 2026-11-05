const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const testCss = `
.product-body {
  padding: 1.25rem 1rem !important;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.18rem !important;
  line-height: 1.35 !important;
  min-height: 3.2rem !important;
  margin-bottom: 0.5rem !important;
  color: var(--primary-dark);
}

.product-desc {
  font-size: 0.86rem !important;
  color: var(--text-muted);
  margin-bottom: 0.85rem !important;
  line-height: 1.5 !important;
  flex-grow: 1 !important;
}

.product-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.85rem !important;
  min-height: 28px;
}

.product-footer {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 0.5rem !important;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.85rem !important;
  margin-top: auto !important;
  min-height: 52px !important;
}

.product-price {
  font-size: 1.12rem !important;
  font-weight: 800;
  color: var(--primary-dark);
  font-family: var(--font-sans);
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.product-price span {
  font-size: 0.78rem !important;
  font-weight: 400;
  color: var(--text-muted);
  white-space: nowrap !important;
}

.btn-enquire-product {
  background-color: var(--primary-subtle);
  color: var(--primary);
  border: 1px solid rgba(46, 78, 28, 0.25);
  font-size: 0.8rem !important;
  font-weight: 700;
  padding: 0.4rem 0.85rem !important;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem !important;
  cursor: pointer;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
  transition: all var(--transition-fast);
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .product-body {
    padding: 1.15rem 0.85rem !important;
  }
  .product-price {
    font-size: 1.05rem !important;
  }
  .btn-enquire-product {
    padding: 0.38rem 0.75rem !important;
    font-size: 0.78rem !important;
  }
}
`;

const htmlSnippet = `
<style>
${testCss}
</style>
<script>
window.addEventListener('load', () => {
  const cards = Array.from(document.querySelectorAll('section.bg-cream .product-card'));
  const data = cards.map((c, i) => {
    const cardRect = c.getBoundingClientRect();
    const btn = c.querySelector('.btn-enquire-product').getBoundingClientRect();
    const price = c.querySelector('.product-price').getBoundingClientRect();
    const footer = c.querySelector('.product-footer').getBoundingClientRect();
    return {
      card: i + 1,
      cardH: Math.round(cardRect.height),
      footerTop: Math.round(footer.top),
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
fs.writeFileSync('temp_test_mob.html', indexHtml, 'utf8');

[768, 575, 375].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},900 "file:///${path.resolve('temp_test_mob.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="TEST_DATA">([^<]+)</);
  if (m) {
    console.log(`=== Width: ${w}px ===`);
    const list = JSON.parse(m[1]);
    console.table(list);
  }
});

fs.unlinkSync('temp_test_mob.html');

