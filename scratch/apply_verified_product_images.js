const fs = require('fs');

// 1. Update products.html
let productsHtml = fs.readFileSync('products.html', 'utf8');
const prodReplacements = [
  'photo-1549978113-29eb25c8177f', // Groundnut: raw peanuts in shells
  'photo-1778048840964-d221d23b86ee', // Sesame: toasted golden sesame seeds
  'photo-1588413335367-e49d32c5b50b', // Coconut: coconut halves + oil bottle
  'photo-1701188543419-f2e932565056', // Mustard: black mustard seeds in spoon
  'photo-1597848212624-a19eb35e2651', // Sunflower: vibrant sunflower
  'photo-1608571423902-eed4a5ad8108'  // Castor: amber dropper bottle
];
let pIdx = 0;
productsHtml = productsHtml.replace(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/g, (match, oldId) => {
  if (pIdx < prodReplacements.length) {
    const newId = prodReplacements[pIdx++];
    return `https://images.unsplash.com/${newId}`;
  }
  return match;
});
fs.writeFileSync('products.html', productsHtml, 'utf8');
console.log('Updated products.html with visually verified seed & oil images');

// 2. Update index.html product cards
let indexHtml = fs.readFileSync('index.html', 'utf8');
const indexProdReplacements = [
  // Skip first 2 images (hero card, about preview)
  null,
  null,
  'photo-1546545584-c03ac781caaf', // Product 1: Shelled peanut kernels
  'photo-1705026042359-2d5b761845f3', // Product 2: White sesame seeds with spoon
  'photo-1591282017732-207fbba7dfd4', // Product 3: Split coconut husks with white meat
  'photo-1500382017468-9049fed747ef'  // Product 4: Golden mustard crop field
];
let iIdx = 0;
indexHtml = indexHtml.replace(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/g, (match, oldId) => {
  const repl = indexProdReplacements[iIdx++];
  if (repl) {
    return `https://images.unsplash.com/${repl}`;
  }
  return match;
});
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html product cards with visually verified seed & oil images');

// 3. Update home-2.html hero floating cards
let home2Html = fs.readFileSync('home-2.html', 'utf8');
const home2FloatingReplacements = [
  'photo-1622542086073-dcdc3350cc2b', // Floating 1: Brown peanuts in ceramic bowl
  'photo-1514733670139-4d87a1941d55', // Floating 2: Organic sesame seeds on timber
  'photo-1446889727648-8c23e3039b24', // Floating 3: Coconut palm trees
  'photo-1509358271058-acd22cc93898'  // Floating 4: Natural seeds on spoons
];
let hIdx = 0;
home2Html = home2Html.replace(/https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/g, (match, oldId) => {
  if (hIdx < home2FloatingReplacements.length) {
    const newId = home2FloatingReplacements[hIdx++];
    return `https://images.unsplash.com/${newId}`;
  }
  return match;
});
fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('Updated home-2.html hero floating cards with visually verified seed & oil images');

