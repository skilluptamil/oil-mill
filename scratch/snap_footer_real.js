const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Inject script to scroll to footer immediately
const scrollScript = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.scrollIntoView();
  }
});
</script>
`;

const tempHtml = indexHtml.replace('</body>', scrollScript + '</body>');
fs.writeFileSync('scratch/scroll_footer.html', tempHtml, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/scroll_footer.html').replace(/\\/g, '/');
const outFooter = path.join(artifactDir, 'index_footer_light.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${outFooter}" --window-size=1280,720 "${fileUrl}"`);
console.log('index_footer_light.png taken!');

// Also dark mode:
const tempHtmlDark = tempHtml.replace('<html lang="en" dir="ltr" data-theme="light">', '<html lang="en" dir="ltr" data-theme="dark">');
fs.writeFileSync('scratch/scroll_footer_dark.html', tempHtmlDark, 'utf8');
const fileUrlDark = 'file:///' + path.resolve('scratch/scroll_footer_dark.html').replace(/\\/g, '/');
const outFooterDark = path.join(artifactDir, 'index_footer_dark.png');
execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${outFooterDark}" --window-size=1280,720 "${fileUrlDark}"`);
console.log('index_footer_dark.png taken!');

