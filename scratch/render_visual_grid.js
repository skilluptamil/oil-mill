const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

// Candidate lists for each product
const candidates = [
  // PEANUT / GROUNDNUT
  { tag: 'peanut', id: 'photo-1567894340315-735d7c361db0' }, // already confirmed raw peanuts in shells!
  { tag: 'peanut', id: 'photo-1598965675045-45c5e72c7d05' }, // already confirmed roasted peanuts in wooden bowl!
  { tag: 'peanut', id: 'photo-1528751014936-863e6e7a319c' },
  { tag: 'peanut', id: 'photo-1534483509719-3feaee7c30da' },
  { tag: 'peanut', id: 'photo-1563729784474-d77dbb933a9e' },
  { tag: 'peanut', id: 'photo-1582515073490-39981397c445' },
  
  // SESAME / GINGELLY
  { tag: 'sesame', id: 'photo-1508746829417-e6f548d8d6ed' }, // seeds in bowl
  { tag: 'sesame', id: 'photo-1515543237350-b3eea1ec8082' }, // sesame texture
  { tag: 'sesame', id: 'photo-1547517023-7ca0c162f816' },
  { tag: 'sesame', id: 'photo-1606811841689-23dfddce3e95' },
  { tag: 'sesame', id: 'photo-1596040033229-a9821ebd058d' }, // seeds in spoon

  // COCONUT
  { tag: 'coconut', id: 'photo-1550617931-e17a7b70dce2' }, // split coconut
  { tag: 'coconut', id: 'photo-1584473457406-6240486418e9' }, // copra
  { tag: 'coconut', id: 'photo-1526947425960-945c6e72858f' }, // coconut oil in jar
  { tag: 'coconut', id: 'photo-1516253593875-bd7ba052fbc5' }, // coconut palm
  { tag: 'coconut', id: 'photo-1449339854873-750e6913301b' }, // coconuts
  { tag: 'coconut', id: 'photo-1560769629-975ec94e6a86' },

  // MUSTARD
  { tag: 'mustard', id: 'photo-1615485290382-441e4d049cb5' },
  { tag: 'mustard', id: 'photo-1500382017468-9049fed747ef' },
  { tag: 'mustard', id: 'photo-1596040033229-a9821ebd058d' },
  { tag: 'mustard', id: 'photo-1533038590840-1cde6e668a91' },

  // SUNFLOWER
  { tag: 'sunflower', id: 'photo-1597848212624-a19eb35e2651' },
  { tag: 'sunflower', id: 'photo-1518568814500-bf0f8d125f46' },
  { tag: 'sunflower', id: 'photo-1470240731273-7821a6eeb6bd' },
  { tag: 'sunflower', id: 'photo-1508020963102-c6c723be9764' },

  // CASTOR / AMBER BOTTLE / WELLNESS
  { tag: 'castor', id: 'photo-1608571423902-eed4a5ad8108' },
  { tag: 'castor', id: 'photo-1556228720-195a672e8a03' },
  { tag: 'castor', id: 'photo-1544816155-12df9643f363' },
  { tag: 'castor', id: 'photo-1617897903246-719242758050' },
  { tag: 'castor', id: 'photo-1601049541289-9b1b7bbbfe19' }
];

let html = `<!DOCTYPE html><html><head><style>
  body { font-family: sans-serif; background: #222; color: #fff; padding: 20px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
  .item { background: #333; padding: 10px; border-radius: 8px; }
  img { width: 100%; height: 180px; object-fit: cover; border-radius: 4px; }
  p { font-size: 12px; margin: 5px 0 0; word-break: break-all; }
</style></head><body><h2>Visual Inspection Grid</h2><div class="grid">`;

candidates.forEach(c => {
  html += `
  <div class="item">
    <img src="https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=400&q=80" alt="${c.tag}" loading="eager">
    <p><b>[${c.tag.toUpperCase()}]</b> ${c.id}</p>
  </div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('scratch/visual_grid.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/visual_grid.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'visual_grid_check.png')}" --window-size=1400,1800 "${fileUrl}"`);
console.log('Visual grid rendered and captured to visual_grid_check.png!');

