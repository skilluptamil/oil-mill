const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

// Light mode header at 1280px
const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'final_header_1280_light.png')}" --window-size=1280,140 "${fileUrl}"`);
console.log('final_header_1280_light.png done');

// Light mode header at 1024px
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'final_header_1024_light.png')}" --window-size=1024,140 "${fileUrl}"`);
console.log('final_header_1024_light.png done');

// Standalone footer in light mode
const fileUrlFooterLight = 'file:///' + path.resolve('scratch/footer_light.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'final_footer_light.png')}" --window-size=1280,500 "${fileUrlFooterLight}"`);
console.log('final_footer_light.png done');

// Dark mode header at 1280px
const fileUrlDark = 'file:///' + path.resolve('scratch/test_preview_dark.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'final_header_1280_dark.png')}" --window-size=1280,140 "${fileUrlDark}"`);
console.log('final_header_1280_dark.png done');

// Standalone footer in dark mode
const fileUrlFooterDark = 'file:///' + path.resolve('scratch/footer_dark.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'final_footer_dark.png')}" --window-size=1280,500 "${fileUrlFooterDark}"`);
console.log('final_footer_dark.png done');

