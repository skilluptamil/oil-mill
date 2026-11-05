const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

let html = fs.readFileSync('index.html', 'utf8');

const script = `
<script>
window.addEventListener('DOMContentLoaded', () => {
  const homeLi = document.querySelector('.navbar-nav li:nth-child(1)');
  const aboutLi = document.querySelector('.navbar-nav li:nth-child(2)');
  const homeA = homeLi.querySelector('.nav-link');
  const aboutA = aboutLi.querySelector('.nav-link');

  function getInfo(el, name) {
    const cs = window.getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      name,
      top: r.top,
      bottom: r.bottom,
      height: r.height,
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      display: cs.display,
      alignSelf: cs.alignSelf,
      lineHeight: cs.lineHeight,
      position: cs.position
    };
  }

  const res = {
    homeLi: getInfo(homeLi, 'homeLi'),
    aboutLi: getInfo(aboutLi, 'aboutLi'),
    homeA: getInfo(homeA, 'homeA'),
    aboutA: getInfo(aboutA, 'aboutA')
  };

  const tag = document.createElement('textarea');
  tag.id = 'DEEP_DIFF_RAW';
  tag.value = JSON.stringify(res);
  document.body.appendChild(tag);
});
</script>
`;

html = html.replace('</body>', script + '</body>');
fs.writeFileSync('scratch/deep_test.html', html, 'utf8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve('scratch/deep_test.html').replace(/\\/g, '/');
const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/<textarea id="DEEP_DIFF_RAW">([\s\S]*?)<\/textarea>/);
if (m) {
  console.log('Result found:', m[1]);
} else {
  console.log('Not matched in output length', output.length);
}
