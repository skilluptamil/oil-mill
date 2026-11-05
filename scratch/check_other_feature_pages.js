const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const pages = ['about.html', 'services.html', 'service-details.html', 'home-2.html'];

pages.forEach(p => {
  const fileUrl = 'file:///' + path.resolve(p).replace(/\\/g, '/');
  try {
    const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=1000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
    console.log(`Page ${p} loaded successfully (${dom.length} chars)`);
  } catch (e) {
    console.error(`Error loading ${p}:`, e.message);
  }
});

