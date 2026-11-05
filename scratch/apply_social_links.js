const fs = require('fs');
const path = require('path');

const targetBlock = `<div class="footer-social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Follow us on Facebook" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Follow us on Instagram" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Subscribe on YouTube" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Chat with us on WhatsApp" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
          </div>`;

const files = [
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

let updatedCount = 0;

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  // Regex to find footer-social-links block
  const regex = /<div class="footer-social-links">[\s\S]*?<\/div>/;
  if (regex.test(content)) {
    content = content.replace(regex, targetBlock);
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated footer social links in ${f}`);
    updatedCount++;
  } else {
    console.warn(`Could not find footer-social-links in ${f}`);
  }
});

// Also update coming-soon.html
if (fs.existsSync('coming-soon.html')) {
  let cs = fs.readFileSync('coming-soon.html', 'utf8');
  const csOld = /<div class="d-flex justify-content-center gap-3">[\s\S]*?aria-label="WhatsApp"><i class="bi bi-whatsapp"><\/i><\/a>\s*<\/div>/;
  const csNew = `<div class="d-flex justify-content-center gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Follow us on Facebook" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Follow us on Instagram" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Subscribe on YouTube" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="footer-social-link" title="Chat with us on WhatsApp" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
            </div>`;
  if (csOld.test(cs)) {
    cs = cs.replace(csOld, csNew);
    fs.writeFileSync('coming-soon.html', cs, 'utf8');
    console.log('Updated coming-soon.html social links');
  }
}

// Also update blog-details.html share links
if (fs.existsSync('blog-details.html')) {
  let bd = fs.readFileSync('blog-details.html', 'utf8');
  const shareOld = /<div class="d-flex gap-2">[\s\S]*?aria-label="Copy Link"><i class="bi bi-link-45deg"><\/i> Copy Link<\/a>\s*<\/div>/;
  const shareNew = `<div class="d-flex gap-2">
                <a href="https://api.whatsapp.com/send?text=Check%20out%20this%20article%20on%20Vaagai%20Chekku%20Cold-Pressed%20Oils" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary" aria-label="Share on WhatsApp"><i class="bi bi-whatsapp text-success"></i> WhatsApp</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://vaagaichekku.com/blog-details.html" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary" aria-label="Share on Facebook"><i class="bi bi-facebook text-primary"></i> Facebook</a>
                <a href="https://twitter.com/intent/tweet?text=Vaagai%20Chekku%20Cold%20Pressed%20Oil" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary" aria-label="Share on Twitter"><i class="bi bi-twitter-x"></i> X / Twitter</a>
                <a href="#" class="btn btn-sm btn-outline-secondary" onclick="event.preventDefault(); if(navigator.clipboard){navigator.clipboard.writeText(window.location.href);} showToast('Link copied to clipboard!', 'success');" aria-label="Copy Link"><i class="bi bi-link-45deg"></i> Copy Link</a>
              </div>`;
  if (shareOld.test(bd)) {
    bd = bd.replace(shareOld, shareNew);
    fs.writeFileSync('blog-details.html', bd, 'utf8');
    console.log('Updated blog-details.html share links');
  }
}

console.log(`\nFinished updating social links in ${updatedCount} main pages.`);

