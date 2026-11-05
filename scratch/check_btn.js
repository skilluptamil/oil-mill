const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.btn-nav-enquire');
  const cs = window.getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const res = {
    top: r.top,
    bottom: r.bottom,
    height: r.height,
    computedHeight: cs.height,
    display: cs.display,
    lineHeight: cs.lineHeight,
    padding: cs.padding
  };
  const tag = document.createElement('div');
  tag.id = 'BTN_STYLE';
  tag.setAttribute('data-res', JSON.stringify(res));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/btn_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/btn_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="BTN_STYLE" data-res="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('Button Style:', JSON.parse(raw));
}

