const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  
  const textPositions = navLinks.map(l => {
    // Get text node or span range rect
    const range = document.createRange();
    if (l.querySelector('span')) {
      range.selectNodeContents(l.querySelector('span'));
    } else {
      range.selectNodeContents(l.childNodes[0]);
    }
    const r = range.getBoundingClientRect();
    return {
      text: l.textContent.trim().replace(/\\s+/g, ' '),
      top: r.top,
      bottom: r.bottom,
      height: r.height,
      center: r.top + r.height / 2
    };
  });

  const tag = document.createElement('div');
  tag.id = 'TEXT_POS';
  tag.setAttribute('data-pos', JSON.stringify(textPositions));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/text_pos_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/text_pos_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="TEXT_POS" data-pos="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  const data = JSON.parse(raw);
  console.log('Text Positions:');
  data.forEach(d => console.log(d.text.padEnd(20), 'top=' + d.top.toFixed(2), 'height=' + d.height.toFixed(2), 'center=' + d.center.toFixed(2)));
}

