const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const out1280 = path.resolve('scratch/current_index_1280.png').replace(/\\/g, '/');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out1280}" --window-size=1280,1400 "${fileUrl}"`);
console.log('Saved 1280 screenshot');

