const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const testItems = [
  { label: 'Large pestle mortar', id: 'photo-1768052270939-4c63c38c21c3' },
  { label: 'Traditional grinding', id: 'photo-1746293769979-5c8cd4fdefc8' },
  { label: 'Oil pouring stream', id: 'photo-1768689033119-c3ac1e437d20' },
  { label: 'Amber dropper bottle', id: 'photo-1793100123550-1f5d5138df9a' },
  { label: 'Lab pipette testing', id: 'photo-1579154204601-01588f351e67' }
];

let html = `<!DOCTYPE html><html><body style="background:#111;color:#fff;display:grid;grid-template-columns:repeat(5,1fr);gap:15px;padding:20px;">`;
testItems.forEach(t => {
  html += `<div><img src="https://images.unsplash.com/${t.id}?auto=format&fit=crop&w=400&q=80" style="width:100%;height:180px;object-fit:cover;"><p style="font-size:12px;">${t.label}<br>${t.id}</p></div>`;
});
html += `</body></html>`;

fs.writeFileSync('scratch/test_process_candidates.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'process_candidates_check.png')}" --window-size=1200,350 "file:///${path.resolve('scratch/test_process_candidates.html').replace(/\\/g, '/')}"`);
console.log('Saved process_candidates_check.png');

