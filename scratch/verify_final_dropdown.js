const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let indexHtml = fs.readFileSync('index.html', 'utf8')
  .replace(/href="css\//g, 'href="../css/')
  .replace(/src="assets\//g, 'src="../assets/');

const desktopScript = `
<script>
window.addEventListener('load', () => {
  const homeLink = document.querySelector('.dropdown-toggle');
  homeLink.click();

  setTimeout(() => {
    const header = document.querySelector('.site-header');
    const menu = document.querySelector('.navbar .dropdown-menu');
    const aboutLink = document.querySelector('.navbar-nav li:nth-child(2)');
    const hr = header.getBoundingClientRect();
    const mr = menu.getBoundingClientRect();
    const ar = aboutLink.getBoundingClientRect();

    const data = {
      headerBottom: hr.bottom,
      menuTop: mr.top,
      menuBottom: mr.bottom,
      gapFromNavbar: mr.top - hr.bottom,
      isBelowNavbar: mr.top >= hr.bottom,
      aboutUsLeft: ar.left,
      aboutUsRight: ar.right,
      aboutUsTop: ar.top,
      aboutUsBottom: ar.bottom,
      menuLeft: mr.left,
      menuRight: mr.right,
      overlapWithAboutUs: !(mr.right < ar.left || mr.left > ar.right || mr.bottom < ar.top || mr.top > ar.bottom)
    };

    const tag = document.createElement('div');
    tag.id = 'FINAL_DROPDOWN_DATA';
    tag.setAttribute('data-info', JSON.stringify(data));
    document.body.appendChild(tag);
  }, 100);
});
</script>
`;

// Desktop Light
let htmlLight = indexHtml.replace('</body>', desktopScript + '</body>');
fs.writeFileSync('scratch/verify_desktop_light.html', htmlLight, 'utf8');
let urlLight = 'file:///' + path.resolve('scratch/verify_desktop_light.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${path.join(artifactDir, 'final_dropdown_desktop_light.png')}" --window-size=1280,350 "${urlLight}"`);

// Desktop Dark
let htmlDark = indexHtml.replace('<html lang="en" dir="ltr" data-theme="light">', '<html lang="en" dir="ltr" data-theme="dark">')
                        .replace('</body>', desktopScript + '</body>');
fs.writeFileSync('scratch/verify_desktop_dark.html', htmlDark, 'utf8');
let urlDark = 'file:///' + path.resolve('scratch/verify_desktop_dark.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${path.join(artifactDir, 'final_dropdown_desktop_dark.png')}" --window-size=1280,350 "${urlDark}"`);

// Mobile Script
const mobileScript = `
<script>
window.addEventListener('load', () => {
  const collapse = document.getElementById('navbarChekku');
  collapse.classList.add('show');
  const homeLink = document.querySelector('.dropdown-toggle');
  homeLink.click();
});
</script>
`;

let htmlMobile = indexHtml.replace('</body>', mobileScript + '</body>');
fs.writeFileSync('scratch/verify_mobile.html', htmlMobile, 'utf8');
let urlMobile = 'file:///' + path.resolve('scratch/verify_mobile.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${path.join(artifactDir, 'final_dropdown_mobile.png')}" --window-size=375,600 "${urlMobile}"`);

console.log('All verification screenshots captured!');

const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${urlLight}"`, { encoding: 'utf8' });
const m = output.match(/id="FINAL_DROPDOWN_DATA" data-info="([^"]+)"/);
if (m) {
  console.log('Measurement Result:\n', JSON.stringify(JSON.parse(m[1].replace(/&quot;/g, '"')), null, 2));
}
