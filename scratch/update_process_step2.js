const fs = require('fs');

let processHtml = fs.readFileSync('process.html', 'utf8');

// Replace Step 2 image: photo-1509358271058-acd22cc93898 -> photo-1533634923031-5ddbd8505b92
processHtml = processHtml.replace(
  'https://images.unsplash.com/photo-1509358271058-acd22cc93898',
  'https://images.unsplash.com/photo-1533634923031-5ddbd8505b92'
);

fs.writeFileSync('process.html', processHtml, 'utf8');
console.log('Updated process.html Step 2 with photo-1533634923031-5ddbd8505b92');

