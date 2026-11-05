const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let indexHtml = path.resolve('index.html');
let fileUrl = 'file:///' + indexHtml.replace(/\\/g, '/');

let script = `
<script>
window.addEventListener('load', () => {
  const el = document.getElementById('products');
  if (el) el.scrollIntoView();
});
</script>
`;

let content = require('fs').readFileSync('index.html', 'utf8').replace('</body>', script + '</body>');
require('fs').writeFileSync('scratch/snap_index_products.html', content, 'utf8');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${path.join(artifactDir, 'index_products_check.png')}" --window-size=1280,1000 "file:///${path.resolve('scratch/snap_index_products.html').replace(/\\/g, '/')}"`);
console.log('Captured index_products_check.png');

