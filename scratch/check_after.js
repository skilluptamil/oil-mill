const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const homeA = document.querySelector('.navbar-nav .nav-link.active');
  const cs = window.getComputedStyle(homeA);
  const afterCs = window.getComputedStyle(homeA, '::after');

  const info = {
    color: cs.color,
    afterContent: afterCs.content,
    afterWidth: afterCs.width,
    afterHeight: afterCs.height,
    afterBg: afterCs.backgroundColor,
    afterDisplay: afterCs.display,
    afterPos: afterCs.position,
    afterBottom: afterCs.bottom
  };

  const tag = document.createElement('div');
  tag.id = 'AFTER_INFO';
  tag.setAttribute('data-info', JSON.stringify(info));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/after_test.html', html, 'utf8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve('scratch/after_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="AFTER_INFO" data-info="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log(JSON.stringify(JSON.parse(raw), null, 2));
}

