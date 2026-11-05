const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function getImgFromUnsplashSlug(slug) {
  try {
    const url = `https://unsplash.com/photos/${slug}`;
    const dom = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "${url}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const m = dom.match(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)\?([^"'\s>]+)/);
    if (m) {
      console.log(`${slug} -> ${m[1]}`);
      return m[1];
    } else {
      console.log(`${slug} -> no image found`);
    }
  } catch (e) {
    console.error(`Error for ${slug}:`, e.message);
  }
}

getImgFromUnsplashSlug('oBCH-r7Mvuo');
getImgFromUnsplashSlug('z2-qO4xS_io');

