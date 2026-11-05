const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html><html><body><img src="https://images.unsplash.com/photo-1790858985850-b4153cf6664a?auto=format&fit=crop&w=600&q=80" style="width:400px;height:300px;object-fit:cover;"></body></html>`;

fs.writeFileSync('scratch/test_sugarcane2.html', html, 'utf8');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'sugarcane2_check.png')}" --window-size=600,400 "file:///${path.resolve('scratch/test_sugarcane2.html').replace(/\\/g, '/')}"`);
console.log('Saved sugarcane2_check.png');

