const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

[992, 1024, 1100, 1200, 1280, 1366, 1440].forEach(w => {
  const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=1500 --dump-dom --window-size=${w},1000 "file:///${path.resolve('scratch/measure_prices.html').replace(/\\/g, '/')}"`, { encoding: 'utf8' });
  const m = dom.match(/id="PRICES" data-info="([^"]+)"/);
  if (m) {
    const list = JSON.parse(m[1].replace(/&quot;/g, '"'));
    console.log(`Width ${w}px: footerWidth=${list[0].footerWidth}px, anyWrapped=${list.some(x => x.wrapped)} (card4 height=${list[3].priceHeight}px, card1 height=${list[0].priceHeight}px)`);
  }
});

