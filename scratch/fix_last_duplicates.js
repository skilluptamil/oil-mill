const fs = require('fs');

// 1. Update services.html line 171
let servicesHtml = fs.readFileSync('services.html', 'utf8');
servicesHtml = servicesHtml.replace(
  'https://images.unsplash.com/photo-1606851094655-b2593a9af63f',
  'https://images.unsplash.com/photo-1596040033229-a9821ebd058d'
);
fs.writeFileSync('services.html', servicesHtml, 'utf8');
console.log('Updated services.html: Wooden Chekku Milling -> photo-1596040033229-a9821ebd058d');

// 2. Update blog-details.html line 209
let blogDetailsHtml = fs.readFileSync('blog-details.html', 'utf8');
blogDetailsHtml = blogDetailsHtml.replace(
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95',
  'https://images.unsplash.com/photo-1650192388648-65800ec59fee'
);
fs.writeFileSync('blog-details.html', blogDetailsHtml, 'utf8');
console.log('Updated blog-details.html: Related Palm Jaggery -> photo-1650192388648-65800ec59fee');

