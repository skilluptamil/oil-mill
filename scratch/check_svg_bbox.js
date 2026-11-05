const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const html = `<!DOCTYPE html>
<html>
<body>
  <div id="svg-wrap" style="display: inline-block;">
    ${fs.readFileSync('assets/logos/logo.svg', 'utf8')}
  </div>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      const svg = document.querySelector('svg');
      const bbox = svg.getBBox();
      const res = {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
        right: bbox.x + bbox.width,
        bottom: bbox.y + bbox.height
      };
      const tag = document.createElement('div');
      tag.id = 'BBOX';
      tag.setAttribute('data-res', JSON.stringify(res));
      document.body.appendChild(tag);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/svg_bbox.html', html, 'utf8');
const fileUrl = 'file:///' + path.resolve('scratch/svg_bbox.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="BBOX" data-res="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('SVG BBox:', JSON.parse(raw));
}

