const fs = require('fs');

const inv = JSON.parse(fs.readFileSync('scratch/image_inventory.json', 'utf8'));
console.log('CSS Images:');
inv.css.forEach(c => console.log(c.file, '->', c.src));

