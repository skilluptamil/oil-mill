const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const pagesToSnap = [
  { file: 'products.html', name: 'final_verified_products', width: 1280, height: 1200 },
  { file: 'index.html', name: 'final_verified_index', width: 1280, height: 1200 },
  { file: 'home-2.html', name: 'final_verified_home2', width: 1280, height: 1200 },
  { file: 'process.html', name: 'final_verified_process', width: 1280, height: 1200 }
];

pagesToSnap.forEach(p => {
  const filePath = path.resolve(p.file);
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const outPath = path.join(artifactDir, `${p.name}.png`);

  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${outPath}" --window-size=${p.width},${p.height} "${fileUrl}"`);
    console.log(`Captured: ${p.name}.png`);
  } catch (e) {
    console.error(`Error capturing ${p.name}:`, e.message);
  }
});

console.log('Final verified snapshots complete!');

