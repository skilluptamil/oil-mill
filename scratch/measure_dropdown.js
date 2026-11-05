const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let html = fs.readFileSync('index.html', 'utf8');

const testScript = `
<script>
window.addEventListener('load', () => {
  const header = document.querySelector('.site-header');
  const navbar = document.querySelector('.navbar');
  const homeItem = document.querySelector('.nav-item.dropdown');
  const homeLink = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.navbar .dropdown-menu');

  homeLink.click();

  setTimeout(() => {
    const hr = header.getBoundingClientRect();
    const nr = navbar.getBoundingClientRect();
    const ir = homeItem.getBoundingClientRect();
    const lr = homeLink.getBoundingClientRect();
    const mr = menu.getBoundingClientRect();

    const data = {
      headerBottom: hr.bottom,
      navbarBottom: nr.bottom,
      homeItemBottom: ir.bottom,
      homeLinkBottom: lr.bottom,
      menuTop: mr.top,
      menuLeft: mr.left,
      homeLinkLeft: lr.left,
      overlapWithNavbar: mr.top < hr.bottom,
      gapFromHeaderBottom: mr.top - hr.bottom
    };

    const tag = document.createElement('div');
    tag.id = 'DROPDOWN_POS';
    tag.setAttribute('data-info', JSON.stringify(data));
    document.body.appendChild(tag);
  }, 100);
});
</script>
`;

html = html.replace('</body>', testScript + '</body>');
fs.writeFileSync('scratch/dropdown_measure.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/dropdown_measure.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="DROPDOWN_POS" data-info="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('Current Dropdown Position Data:\n', JSON.stringify(JSON.parse(raw), null, 2));
}

