const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let indexHtml = path.resolve('index.html');
let fileUrl = 'file:///' + indexHtml.replace(/\\/g, '/');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'index_fullpage_check.png')}" --window-size=1280,3000 "${fileUrl}"`);
console.log('Captured index_fullpage_check.png');

