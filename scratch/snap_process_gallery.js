const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

function makeGallery(file, outName) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/<img[^>]+src=["'](https:\/\/images\.unsplash\.com\/[^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi)];
  
  let html = `<!DOCTYPE html><html><head><style>
    body { font-family: sans-serif; background: #1a1e16; color: #fff; padding: 20px; }
    h2 { color: #d4a340; border-bottom: 1px solid #333; padding-bottom: 8px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
    .item { background: #262c20; padding: 10px; border-radius: 8px; border: 1px solid #3d4a34; text-align: center; }
    img { width: 100%; height: 180px; object-fit: cover; border-radius: 4px; }
    h4 { margin: 8px 0 4px; font-size: 13px; color: #f0e6d2; }
    p { font-size: 10px; color: #a0b096; margin: 0; word-break: break-all; }
  </style></head><body><h2>Image Verification Gallery for ${file}</h2><div class="grid">`;

  matches.forEach((m, idx) => {
    html += `
    <div class="item">
      <img src="${m[1]}" alt="${m[2]}" loading="eager">
      <h4>[Step ${idx + 1}] ${m[2]}</h4>
      <p>${m[1].split('?')[0].replace('https://images.unsplash.com/', '')}</p>
    </div>`;
  });

  html += `</div></body></html>`;
  const htmlPath = path.resolve(`scratch/gallery_${outName}.html`);
  fs.writeFileSync(htmlPath, html, 'utf8');

  execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, `gallery_${outName}.png`)}" --window-size=1200,800 "file:///${htmlPath.replace(/\\/g, '/')}"`);
  console.log(`Saved gallery_${outName}.png`);
}

makeGallery('process.html', 'process');

