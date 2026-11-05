const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ url, status: 0, error: err.message });
    });
  });
}

// Test a few candidate URLs
const testUrls = [
  'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
];

Promise.all(testUrls.map(checkUrl)).then(results => {
  results.forEach(r => console.log(r.status, r.contentType, r.url));
});

