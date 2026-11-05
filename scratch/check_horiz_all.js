const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = 'file:///' + path.resolve('scratch/horiz_test.html').replace(/\\/g, '/');

for (const w of [1920, 1440, 1366, 1280, 1024]) {
  const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=${w},800 "${fileUrl}"`, { encoding: 'utf8' });
  const m = output.match(/id="HORIZONTAL_DATA" data-info="([^"]+)"/);
  if (m) {
    const raw = m[1].replace(/&quot;/g, '"');
    const d = JSON.parse(raw);
    console.log(`Width ${w}: containerWidth=${d.containerWidth}, navOffset=${d.navOffsetFromContainerCenter.toFixed(1)}, leftSpace=${d.leftSpaceToBrand.toFixed(1)}, rightSpace=${d.rightSpaceToActions.toFixed(1)}`);
  }
}

