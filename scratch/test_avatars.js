const https = require('https');

const candidates = [
  'photo-1500648767791-00dcc994a43e', // already used
  'photo-1560250097-0b93528c311a', // professional man portrait
  'photo-1519085360753-af0119f7cbe7', // businessman / author
  'photo-1492562080023-ab3db95bfbce', // smiling man portrait
  'photo-1506794778202-cad84cf45f1d', // already used
  'photo-1522075469751-3a6694fb2f61', // already used
  'photo-1534528741775-53994a69daeb', // already used
  'photo-1539571696357-5a69c17a67c6', // photographer/author man
  'photo-1517841905240-472988babdf9', // author portrait
  'photo-1501196354995-cbb51c65aaea'  // smiling mature gentleman
];

candidates.forEach(id => {
  https.get(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=80`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(`${res.statusCode} : ${id}`);
  });
});

