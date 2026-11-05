const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
<script>
window.addEventListener('load', () => {
  const all = Array.from(document.querySelectorAll('*'));
  const overflowing = all.filter(el => {
    const r = el.getBoundingClientRect();
    return r.right > window.innerWidth;
  }).map(el => ({
    tag: el.tagName,
    cls: el.className,
    id: el.id,
    right: Math.round(el.getBoundingClientRect().right),
    width: Math.round(el.getBoundingClientRect().width)
  })).slice(0, 10);
  const div = document.createElement('div');
  div.id = 'OFLOW';
  div.textContent = JSON.stringify(overflowing);
  document.body.appendChild(div);
});
</script>
`;

let h = fs.readFileSync('index.html', 'utf8').replace('</body>', script + '</body>');
fs.writeFileSync('temp_oflow.html', h);
const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=375,900 "file:///${path.resolve('temp_oflow.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
const m = dom.match(/id="OFLOW">([^<]+)</);
if (m) console.log(JSON.parse(m[1]));
fs.unlinkSync('temp_oflow.html');

