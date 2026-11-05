const https = require('https');

function fetchSearch(query) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=10`;
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = (json.results || []).map(r => ({
            id: r.id,
            description: r.description || r.alt_description,
            raw_url: r.urls ? r.urls.raw : null
          }));
          resolve(results);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function searchAll() {
  const queries = [
    'peanuts shells',
    'sesame seeds',
    'coconut split',
    'mustard seeds',
    'sunflower field',
    'oil bottle glass',
    'mortar pestle spice',
    'ayurveda oil',
    'indian chef portrait',
    'indian woman portrait',
    'indian farmer portrait',
    'laboratory chemistry flask'
  ];

  const all = {};
  for (const q of queries) {
    const res = await fetchSearch(q);
    all[q] = res;
    console.log(`Fetched ${res.length} photos for "${q}"`);
  }

  require('fs').writeFileSync('scratch/unsplash_napi_results.json', JSON.stringify(all, null, 2), 'utf8');
}

searchAll();

