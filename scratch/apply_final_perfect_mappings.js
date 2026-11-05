const fs = require('fs');

// 1. Update index.html About Preview image (replace avocado salad with handcrafted wooden mortar & pestle)
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(
  'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1596489849178-c479124cfa02?auto=format&fit=crop&w=800&q=80'
);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html: About Preview -> Handcrafted Wooden Mortar & Pestle');

// 2. Update home-2.html Speciality section (replace idlis with granite mortar with seeds)
let home2Html = fs.readFileSync('home-2.html', 'utf8');
home2Html = home2Html.replace(
  'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1570283988059-af8412f4fe91?auto=format&fit=crop&w=800&q=80'
);
fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('Updated home-2.html: Speciality -> Granite Mortar with Crushing Seeds');

// 3. Update about.html Facility image (replace wine glasses with authentic wooden barrels aging cellar)
let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(
  'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529877612930-6e7df7e2b02f?auto=format&fit=crop&w=800&q=80'
);
fs.writeFileSync('about.html', aboutHtml, 'utf8');
console.log('Updated about.html: Facility -> Wooden Barrels Aging Cellar');

// 4. Update services.html
let servicesHtml = fs.readFileSync('services.html', 'utf8');
// Service 1: Commercial Plant -> Stainless steel extraction plant
servicesHtml = servicesHtml.replace(
  'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532634733-cae1395e440f?auto=format&fit=crop&w=800&q=80'
);
// Service 2: Wooden Chekku Milling -> Artisan seed milling
servicesHtml = servicesHtml.replace(
  'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=800&q=80'
);
// Service 3: Bottling Packaging -> Rows of packaged bottled oils
servicesHtml = servicesHtml.replace(
  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1757801333112-7b89af15c7fe?auto=format&fit=crop&w=800&q=80'
);
fs.writeFileSync('services.html', servicesHtml, 'utf8');
console.log('Updated services.html: 3 verified services images');

// 5. Update service-details.html Facility
let serviceDetailsHtml = fs.readFileSync('service-details.html', 'utf8');
serviceDetailsHtml = serviceDetailsHtml.replace(
  'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1651171052773-1f46b5894d6a?auto=format&fit=crop&w=800&q=80'
);
fs.writeFileSync('service-details.html', serviceDetailsHtml, 'utf8');
console.log('Updated service-details.html: Facility -> Stainless steel contract milling extraction facility');

// 6. Update blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');
// Chemical solvents vs traditional -> Lab beakers with chemical liquid
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1753357278471-f56646db80e2?auto=format&fit=crop&w=600&q=80'
);
// Oil pulling -> Beautiful white smile oral health
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1654373535457-383a0a4d00f9?auto=format&fit=crop&w=100&q=80'
);
// Palm Jaggery in blog -> Authentic cane/jaggery spices
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80'
);
// Timber science in sidebar -> Natural wood texture
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=100&q=80'
);
fs.writeFileSync('blog.html', blogHtml, 'utf8');
console.log('Updated blog.html with verified images');

// 7. Update blog-details.html
let blogDetailsHtml = fs.readFileSync('blog-details.html', 'utf8');
// Streaming oil -> Golden oil bottle with steel pourer
blogDetailsHtml = blogDetailsHtml.replace(
  'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552592074-ea7a91b851b3?auto=format&fit=crop&w=600&q=80'
);
fs.writeFileSync('blog-details.html', blogDetailsHtml, 'utf8');
console.log('Updated blog-details.html with verified images');

console.log('\nAll final perfect image mappings applied!');

