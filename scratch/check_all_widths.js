const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');

const widths = [1920, 1440, 1366, 1280, 1100, 1024, 992, 900, 768, 375];

for (const w of widths) {
  const out = path.join(artifactDir, `nav_check_${w}.png`);
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=${w},150 "${fileUrl}"`);
  console.log(`nav_check_${w}.png captured`);
}

