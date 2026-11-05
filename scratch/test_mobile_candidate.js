const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = fs.readFileSync('scratch/candidate_test.html', 'utf8');

// Inject script to open hamburger and open dropdown on mobile
const mobileScript = `
<script>
window.addEventListener('load', () => {
  const collapse = document.getElementById('navbarChekku');
  collapse.classList.add('show');
  const homeLink = document.querySelector('.dropdown-toggle');
  const menu = document.querySelector('.navbar .dropdown-menu');
  menu.classList.add('show');
});
</script>
`;

html = html.replace('</body>', mobileScript + '</body>');
fs.writeFileSync('scratch/candidate_mobile_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/candidate_mobile_test.html').replace(/\\/g, '/');
const outShot = path.join(artifactDir, 'candidate_dropdown_mobile.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${outShot}" --window-size=375,600 "${fileUrl}"`);
console.log('Mobile screenshot taken!');

