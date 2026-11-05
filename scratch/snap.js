const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const outNav = path.join(artifactDir, 'current_nav.png');

console.log('Capturing current_nav.png...');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outNav}" --window-size=1280,180 "${fileUrl}"`);
console.log('Done!');

