const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const testItems = [
  { label: 'Wine barrels cellar', id: 'photo-1529877612930-6e7df7e2b02f' },
  { label: 'Glass oil bottle', id: 'photo-1552592074-ea7a91b851b3' },
  { label: 'Bottling packaging', id: 'photo-1757801333112-7b89af15c7fe' },
  { label: 'Lab beakers flasks', id: 'photo-1753357278471-f56646db80e2' },
  { label: 'Woman smile wellness', id: 'photo-1654373535457-383a0a4d00f9' }
];

let html = `<!DOCTYPE html><html><body style="background:#111;color:#fff;display:grid;grid-template-columns:repeat(5,1fr);gap:15px;padding:20px;">`;
testItems.forEach(t => {
  html += `<div><img src="https://images.unsplash.com/${t.id}?auto=format&fit=crop&w=400&q=80" style="width:100%;height:180px;object-fit:cover;"><p style="font-size:12px;">${t.label}<br>${t.id}</p></div>`;
});
html += `</body></html>`;

fs.writeFileSync('scratch/test_batch_check.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'batch_check.png')}" --window-size=1200,350 "file:///${path.resolve('scratch/test_batch_check.html').replace(/\\/g, '/')}"`);
console.log('Saved batch_check.png');

