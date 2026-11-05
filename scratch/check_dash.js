const fs = require('fs');
const content = fs.readFileSync('dashboard.html', 'utf8');
const m = content.match(/<a class="navbar-brand[^"]*"[^>]*>([\s\S]*?)<\/a>/);
console.log('dashboard brand:', m ? m[1].trim().replace(/\s+/g, ' ') : 'no navbar-brand found');
const m2 = content.match(/<div class="sidebar-brand[^"]*"[^>]*>([\s\S]*?)<\/div>/);
console.log('dashboard sidebar-brand:', m2 ? m2[1].trim().replace(/\s+/g, ' ') : 'no sidebar-brand found');

