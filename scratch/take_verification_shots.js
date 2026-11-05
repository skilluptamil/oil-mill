const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const htmlSnippet = `
<style>
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
</style>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace('</body>', htmlSnippet + '</body>');
fs.writeFileSync('temp_test_shot.html', indexHtml, 'utf8');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/card_mobile_375.png" --window-size=375,1000 "file:///${path.resolve('temp_test_shot.html').replace(/\\/g, '/')}"`);
console.log('Saved 375px mobile shot');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/cards_aligned_1280.png" --window-size=1280,1100 "file:///${path.resolve('temp_test_shot.html').replace(/\\/g, '/')}"`);
console.log('Saved 1280px desktop shot');

fs.unlinkSync('temp_test_shot.html');

