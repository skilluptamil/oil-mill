const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html><html><body><img src="https://images.unsplash.com/photo-1533634923031-5ddbd8505b92?auto=format&fit=crop&w=800&q=80" style="width:600px;height:400px;object-fit:cover;"></body></html>`;

fs.writeFileSync('scratch/test_harvest.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'test_harvest_check.png')}" --window-size=800,600 "file:///${path.resolve('scratch/test_harvest.html').replace(/\\/g, '/')}"`);
console.log('Saved test_harvest_check.png');

