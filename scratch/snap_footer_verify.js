const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const out = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/verified_footer_updated.png';

// Screenshot bottom of index.html
const htmlSnippet = `
<script>
window.addEventListener('load', () => {
  window.scrollTo(0, document.body.scrollHeight);
});
</script>
`;

const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8').replace('</body>', htmlSnippet + '</body>');
fs.writeFileSync('temp_foot.html', h);
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=1280,500 "file:///${path.resolve('temp_foot.html').replace(/\\/g, '/')}"`);
fs.unlinkSync('temp_foot.html');
console.log('Saved verified footer screenshot');

