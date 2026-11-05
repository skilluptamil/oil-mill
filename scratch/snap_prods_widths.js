const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let indexHtml = fs.readFileSync('index.html', 'utf8')
  .replace(/href="css\//g, 'href="../css/')
  .replace(/src="assets\//g, 'src="../assets/');

const snapScript = `
<script>
window.addEventListener('load', () => {
  const sec = document.querySelector('section.section-padding.bg-cream');
  if (sec) sec.scrollIntoView();
});
</script>
`;

fs.writeFileSync('scratch/snap_prods_view.html', indexHtml.replace('</body>', snapScript + '</body>'), 'utf8');

[1024, 1200, 1280, 1400].forEach(w => {
  execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${path.join(artifactDir, `products_grid_${w}.png`)}" --window-size=${w},900 "file:///${path.resolve('scratch/snap_prods_view.html').replace(/\\/g, '/')}"`);
  console.log(`Saved products_grid_${w}.png`);
});

