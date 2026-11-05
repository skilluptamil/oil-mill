const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// We can inspect element bounds by injecting a script into the page or evaluating via chrome
const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');

// Let's create an inspector script
const inspectHtml = `<!DOCTYPE html>
<html>
<body>
<script>
window.addEventListener('load', () => {
  const brand = document.querySelector('.navbar-brand');
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'));
  const actions = document.querySelector('.navbar-actions');
  const rtlBtn = document.querySelector('.rtl-toggle-btn');
  const themeBtn = document.querySelector('.theme-toggle-btn');
  const enquireBtn = document.querySelector('.btn-nav-enquire');
  const navbar = document.querySelector('.navbar');

  const data = {
    navbar: navbar.getBoundingClientRect(),
    brand: brand.getBoundingClientRect(),
    brandImg: brand.querySelector('img').getBoundingClientRect(),
    navLinks: navLinks.map(l => ({ text: l.textContent.trim().replace(/\\s+/g, ' '), rect: l.getBoundingClientRect() })),
    actions: actions.getBoundingClientRect(),
    rtlBtn: rtlBtn.getBoundingClientRect(),
    themeBtn: themeBtn.getBoundingClientRect(),
    enquireBtn: enquireBtn.getBoundingClientRect()
  };

  const div = document.createElement('pre');
  div.id = 'layout-data';
  div.textContent = JSON.stringify(data, null, 2);
  document.body.appendChild(div);
});
</script>
</body>
</html>`;

