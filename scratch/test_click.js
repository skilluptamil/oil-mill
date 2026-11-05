const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = fs.readFileSync('index.html', 'utf8');

// Inject script to click the dropdown toggle once loaded, or open it via bootstrap
const clickScript = `
<script>
window.addEventListener('load', () => {
  const toggle = document.querySelector('.dropdown-toggle');
  if (toggle) {
    toggle.click();
    setTimeout(() => {
      const menu = document.querySelector('.navbar .dropdown-menu');
      const cs = window.getComputedStyle(menu);
      const r = menu.getBoundingClientRect();
      const tr = toggle.getBoundingClientRect();
      const info = {
        menuRect: { top: r.top, left: r.left, width: r.width, height: r.height },
        toggleRect: { top: tr.top, left: tr.left, width: tr.width, height: tr.height },
        menuClasses: menu.className,
        styleAttr: menu.getAttribute('style'),
        popperAttr: menu.getAttribute('data-bs-popper'),
        position: cs.position,
        top: cs.top,
        transform: cs.transform,
        zIndex: cs.zIndex
      };
      const tag = document.createElement('div');
      tag.id = 'CLICK_INFO';
      tag.setAttribute('data-info', JSON.stringify(info));
      document.body.appendChild(tag);
    }, 200);
  }
});
</script>
`;

html = html.replace(/href="css\//g, 'href="../css/').replace(/src="assets\//g, 'src="../assets/');
html = html.replace('</body>', clickScript + '</body>');
fs.writeFileSync('scratch/test_click_dropdown.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/test_click_dropdown.html').replace(/\\/g, '/');
const outShot = path.join(artifactDir, 'dropdown_clicked.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --screenshot="${outShot}" --window-size=1280,400 "${fileUrl}"`);
console.log('dropdown_clicked.png taken');

const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="CLICK_INFO" data-info="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('Click Info:\n', JSON.stringify(JSON.parse(raw), null, 2));
}
