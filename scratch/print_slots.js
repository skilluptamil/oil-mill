const fs = require('fs');
const r = JSON.parse(fs.readFileSync('scratch/page_image_report.json', 'utf8'));

Object.entries(r).filter(([f, imgs]) => imgs.length > 0).forEach(([f, imgs]) => {
  console.log(`\n=================== ${f} (${imgs.length} images) ===================`);
  imgs.forEach((img, i) => {
    console.log(`[${i + 1}] Alt: "${img.alt}"`);
    console.log(`    Heading: ${img.heading || 'N/A'}`);
    console.log(`    Current: ${img.src}`);
  });
});

