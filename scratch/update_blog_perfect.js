const fs = require('fs');

let blogHtml = fs.readFileSync('blog.html', 'utf8');

// Replace card 2: Palm Jaggery -> photo-1790858985850-b4153cf6664a
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1790858985850-b4153cf6664a?auto=format&fit=crop&w=600&q=80'
);

// Replace sidebar 2: Chemical Solvents -> photo-1784913108828-a7a36b9962e2
blogHtml = blogHtml.replace(
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1784913108828-a7a36b9962e2?auto=format&fit=crop&w=100&q=80'
);

fs.writeFileSync('blog.html', blogHtml, 'utf8');
console.log('Updated blog.html with sugarcane field and lab chemical flasks!');

