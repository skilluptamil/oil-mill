const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const pagesToSnap = [
  { file: 'index.html', name: 'verified_home1_hero', width: 1280, height: 800 },
  { file: 'home-2.html', name: 'verified_home2_hero', width: 1280, height: 850 },
  { file: 'products.html', name: 'verified_products_page', width: 1280, height: 1100 },
  { file: 'process.html', name: 'verified_process_page', width: 1280, height: 1100 },
  { file: 'about.html', name: 'verified_about_page', width: 1280, height: 1100 }
];

pagesToSnap.forEach(p => {
  const filePath = path.resolve(p.file);
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');
  const outPath = path.join(artifactDir, `${p.name}.png`);

  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${outPath}" --window-size=${p.width},${p.height} "${fileUrl}"`);
    console.log(`Captured: ${p.name}.png`);
  } catch (e) {
    console.error(`Error capturing ${p.name}:`, e.message);
  }
});

console.log('Visual snapshots completed!');

