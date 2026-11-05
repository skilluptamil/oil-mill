const https = require('https');

function followRedirect(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new URL(res.headers.location, url).href;
        followRedirect(nextUrl).then(resolve);
      } else {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          const match = body.match(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/);
          resolve(match ? match[1] : null);
        });
      }
    }).on('error', () => resolve(null));
  });
}

const slugs = ['oBCH-r7Mvuo', 'z2-qO4xS_io', 'l_M7KxP1tGg', 'fX9k6V8M3sY'];

async function testAll() {
  for (const slug of slugs) {
    const id = await followRedirect(`https://unsplash.com/photos/${slug}`);
    console.log(`${slug} -> ${id}`);
  }
}

testAll();
