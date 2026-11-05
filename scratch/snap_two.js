const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html><html><body style="background:#111;color:#fff;display:flex;gap:20px;padding:20px;">
  <div>
    <h4>Brown Sugar / Jaggery (photo-1726072362679-2b2023862024)</h4>
    <img src="https://images.unsplash.com/photo-1726072362679-2b2023862024?auto=format&fit=crop&w=400&q=80" style="width:300px;height:200px;object-fit:cover;">
  </div>
  <div>
    <h4>Lab Flasks Solvents (photo-1784913108828-a7a36b9962e2)</h4>
    <img src="https://images.unsplash.com/photo-1784913108828-a7a36b9962e2?auto=format&fit=crop&w=400&q=80" style="width:300px;height:200px;object-fit:cover;">
  </div>
</body></html>`;

fs.writeFileSync('scratch/test_two.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'two_check.png')}" --window-size=800,300 "file:///${path.resolve('scratch/test_two.html').replace(/\\/g, '/')}"`);
console.log('Saved two_check.png');

