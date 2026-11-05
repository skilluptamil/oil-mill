const { execSync } = require('child_process');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function getUnsplashPhotos(query) {
  const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  try {
    const html = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom "${url}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const matches = [...html.matchAll(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/g)];
    const ids = Array.from(new Set(matches.map(m => m[1])));
    return ids;
  } catch (e) {
    console.error(`Failed to scrape for ${query}:`, e.message);
    return [];
  }
}

const queries = ['peanuts', 'sesame-seeds', 'coconut', 'mustard-seeds', 'olive-oil', 'spices'];
const results = {};

queries.forEach(q => {
  const ids = getUnsplashPhotos(q);
  console.log(`${q}: found ${ids.length} images`);
  results[q] = ids;
});

fs.writeFileSync('scratch/scraped_unsplash_ids.json', JSON.stringify(results, null, 2), 'utf8');

