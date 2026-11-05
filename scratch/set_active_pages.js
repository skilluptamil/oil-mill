const fs = require('fs');

const pageMapping = {
  'about.html': 'about.html',
  'services.html': 'services.html',
  'service-details.html': 'services.html',
  'pricing.html': 'pricing.html',
  'blog.html': 'blog.html',
  'blog-details.html': 'blog.html',
  'contact.html': 'contact.html'
};

for (const [file, targetHref] of Object.entries(pageMapping)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Ensure Home dropdown doesn't have active
    content = content.replace(
      /(<li class="nav-item dropdown">\s*<a class="nav-link dropdown-toggle) active/g,
      '$1'
    );
    content = content.replace(
      /(<a class="dropdown-item) active(" href="index.html">)/g,
      '$1$2'
    );
    content = content.replace(
      /(<a class="dropdown-item) active(" href="home-2.html">)/g,
      '$1$2'
    );

    // Add active to the target nav-link
    const regex = new RegExp(`(<a class="nav-link)(?! active)(" href="${targetHref}")`);
    if (regex.test(content)) {
      content = content.replace(regex, '$1 active$2');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated active link in ${file} to ${targetHref}`);
    }
  }
}

