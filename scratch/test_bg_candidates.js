const https = require('https');

const bgCandidates = [
  'photo-1542838132-92c53300491e', // golden field/harvest
  'photo-1500382017468-9049fed747ef', // already used for mustard
  'photo-1464226184884-fa280b87c399', // golden farm landscape
  'photo-1500937386664-56d1dfef3854', // golden agriculture field
  'photo-1500651230702-0e2d8a49d4ad', // rural landscape
  'photo-1472396961693-142e6e269027'  // warm countryside nature
];

bgCandidates.forEach(id => {
  https.get(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1920&q=80`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(`${res.statusCode} : ${id}`);
  });
});

