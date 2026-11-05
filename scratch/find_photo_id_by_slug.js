const https = require('https');

const slugs = ['oBCH-r7Mvuo', 'z2-qO4xS_io', 'l_M7KxP1tGg', 'fX9k6V8M3sY'];

slugs.forEach(slug => {
  // Test both source.unsplash.com or unsplash.com/photos/:id
  const url = `https://unsplash.com/photos/${slug}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(`Page ${slug}: ${res.statusCode}`);
    if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
      // let's follow or read the page to find the images.unsplash.com URL
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        const m = body.match(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/);
        if (m) console.log(`Found photo ID for ${slug}: ${m[1]}`);
      });
    }
  });
});

