const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const candidates = [
  { label: 'photo-1514733670139-4d87a1941d55', id: 'photo-1514733670139-4d87a1941d55' },
  { label: 'photo-1547517023-7ca0c162f816', id: 'photo-1547517023-7ca0c162f816' },
  { label: 'photo-1536782376847-5c9d14d97cc0', id: 'photo-1536782376847-5c9d14d97cc0' },
  { label: 'photo-1509358271058-acd22cc93898', id: 'photo-1509358271058-acd22cc93898' },
  { label: 'photo-1574943320219-553eb213f72d', id: 'photo-1574943320219-553eb213f72d' }
];

let html = `<!DOCTYPE html><html><head><style>
  body { font-family: sans-serif; background: #181c14; color: #fff; padding: 25px; }
  .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
  .item { background: #262c20; padding: 12px; border-radius: 8px; text-align: center; }
  img { width: 100%; height: 160px; object-fit: cover; border-radius: 6px; }
  h4 { margin: 8px 0 4px; font-size: 11px; color: #d4a340; word-break: break-all; }
</style></head><body><h2>Extra Candidate Check</h2><div class="grid">`;

candidates.forEach(c => {
  html += `
  <div class="item">
    <img src="https://images.unsplash.com/${c.id}?auto=format&fit=crop&w=400&q=80" alt="${c.label}" loading="eager">
    <h4>${c.label}</h4>
  </div>`;
});

html += `</div></body></html>`;

fs.writeFileSync('scratch/extra_candidates.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/extra_candidates.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --screenshot="${path.join(artifactDir, 'extra_candidates_check.png')}" --window-size=1200,400 "${fileUrl}"`);
console.log('Extra candidates rendered!');

