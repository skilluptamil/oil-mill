const fs = require('fs');
let html = fs.readFileSync('scratch/footer_dark.html', 'utf8');
html = html.replace('logo.svg', 'logo-dark.svg');
fs.writeFileSync('scratch/footer_dark.html', html, 'utf8');

const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';
const urlDark = 'file:///' + path.resolve('scratch/footer_dark.html').replace(/\\/g, '/');
const outDark = path.join(artifactDir, 'final_footer_dark_with_dark_logo.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outDark}" --window-size=1280,500 "${urlDark}"`);
console.log('Saved dark footer with dark logo');

