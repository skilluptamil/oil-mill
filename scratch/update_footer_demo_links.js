const fs = require('fs');

const mainFiles = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'products.html',
  'process.html',
  'pricing.html',
  'blog.html',
  'blog-details.html',
  'contact.html'
];

// Target to replace in main pages: remove Admin Demo link
const oldPattern = /<div class="d-flex gap-3">\s*<a href="login\.html" class="text-muted">Staff Login<\/a>\s*<a href="dashboard\.html" class="text-muted">Admin Demo<\/a>\s*<a href="404\.html" class="text-muted">404 Page<\/a>\s*<a href="coming-soon\.html" class="text-muted">Coming Soon<\/a>\s*<\/div>/;

const newLinks = `<div class="d-flex gap-3">
          <a href="login.html" class="text-muted">Staff Login</a>
          <a href="404.html" class="text-muted">404 Page</a>
          <a href="coming-soon.html" class="text-muted">Coming Soon</a>
        </div>`;

mainFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newLinks);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Removed Admin Demo from ${f}`);
  } else {
    // Try more flexible regex if spacing differed
    const flexiblePattern = /<a href="dashboard\.html" class="text-muted">Admin Demo<\/a>\s*/;
    if (flexiblePattern.test(content)) {
      content = content.replace(flexiblePattern, '');
      fs.writeFileSync(f, content, 'utf8');
      console.log(`Removed Admin Demo (flexible) from ${f}`);
    } else {
      console.warn(`Could not find Admin Demo link in ${f}`);
    }
  }
});

// Update login.html footer
if (fs.existsSync('login.html')) {
  let l = fs.readFileSync('login.html', 'utf8');
  // Update header text in login.html to explicitly say Staff Login
  l = l.replace(
    /<h2 class="fw-bold mb-1">Welcome Back<\/h2>\s*<p class="text-muted small">Access your order tracking, wholesale invoices, or admin panel\.<\/p>/,
    `<span class="badge bg-success-subtle text-success px-3 py-1 mb-2 rounded-pill fw-semibold"><i class="bi bi-shield-lock me-1"></i> Staff & Partner Portal</span>
          <h2 class="fw-bold mb-1">Staff Login</h2>
          <p class="text-muted small">Sign in to access order tracking, wholesale dispatch, and management dashboard.</p>`
  );
  // Remove Admin Dashboard direct link in login footer, replacing with 404 & Coming Soon
  l = l.replace(
    /<a href="dashboard\.html" class="text-muted">Admin Dashboard<\/a>/,
    `<a href="404.html" class="text-muted">404 Page</a>
        <a href="coming-soon.html" class="text-muted">Coming Soon</a>`
  );
  fs.writeFileSync('login.html', l, 'utf8');
  console.log('Updated login.html');
}

// Update 404.html footer
if (fs.existsSync('404.html')) {
  let f404 = fs.readFileSync('404.html', 'utf8');
  f404 = f404.replace(
    /<div class="d-flex justify-content-center gap-3 small">[\s\S]*?<\/div>/,
    `<div class="d-flex justify-content-center gap-3 small">
        <a href="index.html" class="text-muted">Home 1</a>
        <a href="home-2.html" class="text-muted">Home 2</a>
        <a href="products.html" class="text-muted">Products</a>
        <a href="login.html" class="text-muted">Staff Login</a>
        <a href="coming-soon.html" class="text-muted">Coming Soon</a>
        <a href="contact.html" class="text-muted">Contact Us</a>
      </div>`
  );
  fs.writeFileSync('404.html', f404, 'utf8');
  console.log('Updated 404.html');
}

// Update coming-soon.html
if (fs.existsSync('coming-soon.html')) {
  let cs = fs.readFileSync('coming-soon.html', 'utf8');
  // Add Return to Home button
  if (!cs.includes('Return to Main Website')) {
    cs = cs.replace(
      /<\/form>\s*<\/div>/,
      `</form>
            <div class="mt-4 pt-2 border-top">
              <a href="index.html" class="btn btn-outline-custom">
                <i class="bi bi-house-door me-1"></i> Return to Main Website
              </a>
            </div>
          </div>`
    );
  }
  // Update footer links
  cs = cs.replace(
    /<div class="d-flex justify-content-center gap-3 small">[\s\S]*?<\/div>/,
    `<div class="d-flex justify-content-center gap-3 small">
        <a href="index.html" class="text-muted">Home 1</a>
        <a href="home-2.html" class="text-muted">Home 2</a>
        <a href="products.html" class="text-muted">Products</a>
        <a href="login.html" class="text-muted">Staff Login</a>
        <a href="404.html" class="text-muted">404 Page</a>
        <a href="contact.html" class="text-muted">Contact Us</a>
      </div>`
  );
  fs.writeFileSync('coming-soon.html', cs, 'utf8');
  console.log('Updated coming-soon.html');
}

console.log('\nAll updates complete.');

