const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const brandImg = document.querySelector('.navbar-brand img');
  const rtlBtn = document.querySelector('.rtl-toggle-btn');
  const themeBtn = document.querySelector('.theme-toggle-btn');
  const enquireBtn = document.querySelector('.btn-nav-enquire');
  const navLink = document.querySelector('.navbar-nav .nav-link');

  function getCenter(el, label) {
    const r = el.getBoundingClientRect();
    return { label, top: r.top, height: r.height, center: r.top + r.height / 2 };
  }

  const res = [
    getCenter(brandImg, 'Brand Logo Image'),
    getCenter(navLink, 'Nav Link [Home]'),
    getCenter(rtlBtn, 'RTL Button'),
    getCenter(themeBtn, 'Theme Button'),
    getCenter(enquireBtn, 'Enquire Button')
  ];

  const tag = document.createElement('div');
  tag.id = 'ALL_CENTERS';
  tag.setAttribute('data-centers', JSON.stringify(res));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/centers_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/centers_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="ALL_CENTERS" data-centers="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  const data = JSON.parse(raw);
  console.log('Vertical Centers:');
  data.forEach(d => console.log(d.label.padEnd(25), 'top=' + d.top.toFixed(2), 'height=' + d.height.toFixed(2), 'center=' + d.center.toFixed(2)));
}

