const https = require('https');

const candidatesToTest = [
  // Peanut / groundnut oil candidates
  'photo-1590779033100-9f60a05a013d', // peanuts
  'photo-1563729784474-d77dbb933a9e', // peanut butter/oil
  'photo-1534483509719-3feaee7c30da', // nuts/peanuts
  'photo-1567894340315-735d7c361db0', // raw peanuts
  'photo-1508746829417-e6f548d8d6ed', // seeds
  'photo-1606851094655-b2593a9af63f', // peanut / groundnut
  'photo-1596040033229-a9821ebd058d', // wooden spoon seeds
  'photo-1533038590840-1cde6e668a91', // rustic
  'photo-1544816155-12df9643f363', // bottles / jars
  // Oil pulling / oral hygiene candidates
  'photo-1588776814546-1ffcf47267a5', // teeth / smile wellness
  'photo-1607613009820-a29f7bb81c04', // wellness routine
  'photo-1544367567-0f2fcb009e0b', // yoga / wellness
  'photo-1515377905703-c4788e51af15', // morning wellness
  'photo-1571019613454-1cb2f99b2d8b', // self care morning routine
  'photo-1512290903422-92a106f20b35', // original failed
  'photo-1506126613408-eca07ce68773', // morning wellness yoga
  'photo-1598256989800-fe5f95da9787', // smile dentistry wellness
  'photo-1606811841689-23dfddce3e95', // skincare wellness
];

candidatesToTest.forEach(id => {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    console.log(`${res.statusCode} : ${id}`);
  }).on('error', err => {
    console.log(`ERR: ${id} - ${err.message}`);
  });
});

