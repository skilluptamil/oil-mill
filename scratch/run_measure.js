const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const measurementScript = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const brand = document.querySelector('.navbar-brand');
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  const actions = document.querySelector('.navbar-actions');
  const rtlBtn = document.querySelector('.rtl-toggle-btn');
  const themeBtn = document.querySelector('.theme-toggle-btn');
  const enquireBtn = document.querySelector('.btn-nav-enquire');
  const navbar = document.querySelector('.navbar');

  function r(el) {
    const b = el.getBoundingClientRect();
    return { top: Math.round(b.top), bottom: Math.round(b.bottom), height: Math.round(b.height), center: Math.round(b.top + b.height / 2) };
  }

  const data = {
    navbar: r(navbar),
    brand: r(brand),
    brandImg: r(brand.querySelector('img')),
    navLinks: navLinks.map(l => ({ 
      text: l.textContent.trim().replace(/\\s+/g, ' '), 
      ...r(l)
    })),
    actions: r(actions),
    rtlBtn: r(rtlBtn),
    themeBtn: r(themeBtn),
    enquireBtn: r(enquireBtn)
  };

  const tag = document.createElement('div');
  tag.id = 'FINAL_OUTPUT_MEASURE';
  tag.setAttribute('data-result', JSON.stringify(data));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', measurementScript + '</body>');
fs.writeFileSync('scratch/measure_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/measure_test.html').replace(/\\/g, '/');

for (const width of [1280, 1024, 1440]) {
  console.log(`\n=== Testing Window Width: ${width} ===`);
  const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${width},800 "${fileUrl}"`, { encoding: 'utf8' });
  const m = output.match(/id="FINAL_OUTPUT_MEASURE" data-result="([^"]+)"/);
  if (m) {
    const raw = m[1].replace(/&quot;/g, '"');
    const data = JSON.parse(raw);
    console.log('Navbar:', data.navbar);
    console.log('Brand Img:', data.brandImg);
    console.log('Actions:', data.actions);
    console.log('RTL Btn:', data.rtlBtn);
    console.log('Theme Btn:', data.themeBtn);
    console.log('Enquire Btn:', data.enquireBtn);
    data.navLinks.forEach(n => {
      console.log(`Nav Link [${n.text}]: top=${n.top}, height=${n.height}, center=${n.center}`);
    });
  } else {
    console.log('No measurement tag found');
  }
}
