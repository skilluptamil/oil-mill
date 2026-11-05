const fs = require('fs');

const m = JSON.parse(fs.readFileSync('scratch/master_image_map.json', 'utf8'));
m.blog_detail_author = 'photo-1501196354995-cbb51c65aaea';
m.blog_detail_bio_author = 'photo-1519085360753-af0119f7cbe7';

fs.writeFileSync('scratch/master_image_map.json', JSON.stringify(m, null, 2), 'utf8');

const counts = {};
Object.entries(m).forEach(([k, id]) => {
  counts[id] = (counts[id] || []).concat(k);
});
const dups = Object.entries(counts).filter(([id, keys]) => keys.length > 1);
console.log('Total slots:', Object.keys(m).length);
console.log('Unique IDs:', Object.keys(counts).length);
console.log('Duplicates found:', dups.length);
if (dups.length) {
  console.log('Duplicates:', JSON.stringify(dups, null, 2));
} else {
  console.log('SUCCESS! Every single slot has a 100% UNIQUE image ID across the entire site!');
}

