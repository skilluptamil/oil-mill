const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const contactList = [
  // PEANUT (3 distinct)
  { label: 'Groundnut 1 (Pile in shells)', id: 'photo-1549978113-29eb25c8177f' },
  { label: 'Groundnut 2 (Shelled kernels)', id: 'photo-1546545584-c03ac781caaf' },
  { label: 'Groundnut 3 (Bowl of peanuts)', id: 'photo-1622542086073-dcdc3350cc2b' },

  // SESAME (3 distinct)
  { label: 'Sesame 1 (Golden toasted)', id: 'photo-1778048840964-d221d23b86ee' },
  { label: 'Sesame 2 (White with spoon)', id: 'photo-1705026042359-2d5b761845f3' },
  { label: 'Sesame 3 (Black sesame pile)', id: 'photo-1675237625088-fa5ea63a664c' },

  // COCONUT (3 distinct)
  { label: 'Coconut 1 (Oil bottle + halves)', id: 'photo-1588413335367-e49d32c5b50b' },
  { label: 'Coconut 2 (Split copra husks)', id: 'photo-1591282017732-207fbba7dfd4' },
  { label: 'Coconut 3 (Coconut palm trees)', id: 'photo-1446889727648-8c23e3039b24' },

  // MUSTARD (2 distinct)
  { label: 'Mustard 1 (Seeds with spoon)', id: 'photo-1701188543419-f2e932565056' },
  { label: 'Mustard 2 (Golden blooming field)', id: 'photo-1500382017468-9049fed747ef' },

  // SUNFLOWER & CASTOR
  { label: 'Sunflower (Bright blossom)', id: 'photo-1597848212624-a19eb35e2651' },
  { label: 'Castor (Amber dropper bottle)', id: 'photo-1608571423902-eed4a5ad8108' }
];

let html = `<!DOCTYPE html><html><head><style>
  body { font-family: sans-serif; background: #181c14; color: #fff; padding: 25px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
  .item { background: #262c20; padding: 12px; border-radius: 8px; border: 1px solid #3d4a34; text-align: center; }
  img { width: 100%; height: 160px; object-fit: cover; border-radius: 6px; }
  h4 { margin: 8px 0 4px; font-size: 13px; color: #d4a340; }
  p { font-size: 10px; margin: 0; color: #99a88e; word-break: break-all; }
</style></head><body><h2>Direct Visual Contact Sheet: Verified Oil & Seed Photos</h2><div class="grid">`;

contactList.forEach(c => {
  html += `
  <div class="item">
    <img src="https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=400&q=80" alt="${c.label}" loading="eager">
    <h4>${c.label}</h4>
    <p>${c.id}</p>
  </div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('scratch/product_contact_sheet.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/product_contact_sheet.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'product_contact_sheet.png')}" --window-size=1200,900 "${fileUrl}"`);
console.log('Contact sheet rendered to product_contact_sheet.png!');

