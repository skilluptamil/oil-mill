const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const allBtns = Array.from(document.querySelectorAll('.btn-nav-enquire'));
  const data = allBtns.map(el => {
    const cs = window.getComputedStyle(el);
    return {
      parentClass: el.parentElement.className,
      display: cs.display,
      height: cs.height,
      bg: cs.backgroundImage
    };
  });
  const tag = document.createElement('div');
  tag.id = 'ALL_BTNS';
  tag.setAttribute('data-res', JSON.stringify(data));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/btn_debug.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/btn_debug.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="ALL_BTNS" data-res="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('All .btn-nav-enquire:', JSON.parse(raw));
}

