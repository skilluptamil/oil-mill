const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.navbar .container');
  const brand = document.querySelector('.navbar-brand');
  const nav = document.querySelector('.navbar-nav');
  const actions = document.querySelector('.navbar-actions');

  const cRect = container.getBoundingClientRect();
  const bRect = brand.getBoundingClientRect();
  const nRect = nav.getBoundingClientRect();
  const aRect = actions.getBoundingClientRect();

  const containerCenter = cRect.left + cRect.width / 2;
  const navCenter = nRect.left + nRect.width / 2;
  const leftSpace = nRect.left - bRect.right;
  const rightSpace = aRect.left - nRect.right;

  const res = {
    containerWidth: cRect.width,
    containerLeft: cRect.left,
    containerRight: cRect.right,
    containerCenter,
    brandWidth: bRect.width,
    brandRight: bRect.right,
    navWidth: nRect.width,
    navLeft: nRect.left,
    navRight: nRect.right,
    navCenter,
    navOffsetFromContainerCenter: navCenter - containerCenter,
    actionsWidth: aRect.width,
    actionsLeft: aRect.left,
    leftSpaceToBrand: leftSpace,
    rightSpaceToActions: rightSpace
  };

  const tag = document.createElement('div');
  tag.id = 'HORIZONTAL_DATA';
  tag.setAttribute('data-info', JSON.stringify(res));
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/horiz_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/horiz_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="HORIZONTAL_DATA" data-info="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('Horizontal Data:\n', JSON.stringify(JSON.parse(raw), null, 2));
}

