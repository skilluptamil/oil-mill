const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html><html><body><img src="https://images.unsplash.com/photo-1506690952427-2bea8cd8773d?auto=format&fit=crop&w=800&q=80" style="width:600px;height:400px;object-fit:cover;"></body></html>`;

fs.writeFileSync('scratch/test_img.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'test_img_check.png')}" --window-size=800,600 "file:///${path.resolve('scratch/test_img.html').replace(/\\/g, '/')}"`);
console.log('Saved test_img_check.png');

