const fs = require('fs');

let processHtml = fs.readFileSync('process.html', 'utf8');

// Step 3: Hardwood Pestle Crushing -> photo-1746293769979-5c8cd4fdefc8
processHtml = processHtml.replace(
  'https://images.unsplash.com/photo-1606851094655-b2593a9af63f',
  'https://images.unsplash.com/photo-1746293769979-5c8cd4fdefc8'
);

// Step 4: Sun Sedimentation -> photo-1768689033119-c3ac1e437d20
processHtml = processHtml.replace(
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
  'https://images.unsplash.com/photo-1768689033119-c3ac1e437d20'
);

// Step 5: Cotton Filtration & Lab Testing -> photo-1579154204601-01588f351e67
processHtml = processHtml.replace(
  'https://images.unsplash.com/photo-1576086213369-97a306d36557',
  'https://images.unsplash.com/photo-1579154204601-01588f351e67'
);

// Step 6: UV-Protected Bottling -> photo-1793100123550-1f5d5138df9a
processHtml = processHtml.replace(
  'https://images.unsplash.com/photo-1556228720-195a672e8a03',
  'https://images.unsplash.com/photo-1793100123550-1f5d5138df9a'
);

fs.writeFileSync('process.html', processHtml, 'utf8');
console.log('Updated process.html Steps 3, 4, 5, 6 with authentic Chekku process photos!');

