const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const fileUrl = 'file:///' + path.resolve('about.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'about_nav_check.png')}" --window-size=1280,140 "${fileUrl}"`);
console.log('about_nav_check.png captured');

