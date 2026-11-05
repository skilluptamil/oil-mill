const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html><html><body style="background:#222;display:flex;gap:20px;padding:20px;">
  <div>
    <h3 style="color:#fff">Wooden Mortar & Pestle (photo-1596489849178-c479124cfa02)</h3>
    <img src="https://images.unsplash.com/photo-1596489849178-c479124cfa02?auto=format&fit=crop&w=600&q=80" style="width:400px;height:300px;object-fit:cover;">
  </div>
  <div>
    <h3 style="color:#fff">Stone Mortar & Pestle (photo-1570283988059-af8412f4fe91)</h3>
    <img src="https://images.unsplash.com/photo-1570283988059-af8412f4fe91?auto=format&fit=crop&w=600&q=80" style="width:400px;height:300px;object-fit:cover;">
  </div>
</body></html>`;

fs.writeFileSync('scratch/test_mortars.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'test_mortars_check.png')}" --window-size=900,450 "file:///${path.resolve('scratch/test_mortars.html').replace(/\\/g, '/')}"`);
console.log('Saved test_mortars_check.png');

