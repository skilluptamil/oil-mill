const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const testItems = [
  { tag: 'peanut_shells', id: 'photo-1546545584-c03ac781caaf' },
  { tag: 'peanut_pile', id: 'photo-1549978113-29eb25c8177f' },
  { tag: 'sesame_toasted', id: 'photo-1778048840964-d221d23b86ee' },
  { tag: 'sesame_spoon', id: 'photo-1705026042359-2d5b761845f3' },
  { tag: 'coconut_oil_fresh', id: 'photo-1588413335367-e49d32c5b50b' },
  { tag: 'coconut_split', id: 'photo-1591282017732-207fbba7dfd4' },
  { tag: 'mustard_spoon', id: 'photo-1701188543419-f2e932565056' },
  { tag: 'mustard_field', id: 'photo-1500382017468-9049fed747ef' },
  { tag: 'sunflower_blossom', id: 'photo-1597848212624-a19eb35e2651' },
  { tag: 'castor_dropper', id: 'photo-1608571423902-eed4a5ad8108' }
];

let html = `<!DOCTYPE html><html><head><style>
  body { font-family: sans-serif; background: #1a1a1a; color: #fff; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
  .item { background: #2a2a2a; padding: 10px; border-radius: 8px; text-align: center; }
  img { width: 100%; height: 160px; object-fit: cover; border-radius: 4px; }
  h4 { margin: 8px 0 4px; font-size: 14px; color: #e6b800; }
  p { font-size: 11px; margin: 0; color: #aaa; word-break: break-all; }
</style></head><body><h2>Targeted Product & Seed Visual Verification</h2><div class="grid">`;

testItems.forEach(c => {
  html += `
  <div class="item">
    <img src="https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=400&q=80" alt="${c.tag}" loading="eager">
    <h4>${c.tag.toUpperCase()}</h4>
    <p>${c.id}</p>
  </div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('scratch/product_seed_grid.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/product_seed_grid.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'product_seed_grid_check.png')}" --window-size=1200,600 "${fileUrl}"`);
console.log('Product seed grid rendered and captured to product_seed_grid_check.png!');

