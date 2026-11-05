const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = fs.readFileSync('index.html', 'utf8');

// Inject script to add 'show' class to #navbarChekku so it's open
const openMobileNavScript = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const collapse = document.getElementById('navbarChekku');
  if (collapse) {
    collapse.classList.add('show');
  }
});
</script>
`;

html = html.replace(/href="css\//g, 'href="../css/').replace(/src="assets\//g, 'src="../assets/');
html = html.replace('</body>', openMobileNavScript + '</body>');
fs.writeFileSync('scratch/mobile_open_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/mobile_open_test.html').replace(/\\/g, '/');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'nav_mobile_open_768.png')}" --window-size=768,600 "${fileUrl}"`);
console.log('nav_mobile_open_768.png done');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${path.join(artifactDir, 'nav_mobile_open_375.png')}" --window-size=375,600 "${fileUrl}"`);
console.log('nav_mobile_open_375.png done');
