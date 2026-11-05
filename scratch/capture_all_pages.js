const puppeteer = require('puppeteer');
const path = require('path');

const pages = [
  { name: 'page_index_desktop', url: 'index.html', width: 1280, height: 900, fullPage: false },
  { name: 'page_index_products', url: 'index.html#products', width: 1280, height: 900, selector: '#products' },
  { name: 'page_home2_desktop', url: 'home-2.html', width: 1280, height: 900, fullPage: false },
  { name: 'page_home2_collections', url: 'home-2.html', width: 1280, height: 900, selector: '.py-5.bg-pattern' },
  { name: 'page_products_desktop', url: 'products.html', width: 1280, height: 900, selector: '#productsGrid' },
  { name: 'page_process_desktop', url: 'process.html', width: 1280, height: 900, selector: '.container.py-5' },
  { name: 'page_about_desktop', url: 'about.html', width: 1280, height: 900, selector: '.about-team-grid, .team-section, section:nth-of-type(3)' },
  { name: 'page_blog_desktop', url: 'blog.html', width: 1280, height: 900, selector: '.featured-blog-card' }
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const baseDir = path.resolve('.');

  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: p.width, height: p.height, deviceScaleFactor: 2 });
    const fileUrl = 'file://' + path.join(baseDir, p.url.split('#')[0]);

    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      // wait a bit for images to decode
      await new Promise(r => setTimeout(r, 1500));

      const outPath = path.join(baseDir, 'scratch', `${p.name}.png`);

      if (p.selector) {
        const el = await page.$(p.selector);
        if (el) {
          await el.screenshot({ path: outPath });
          console.log(`Saved screenshot: ${p.name}.png`);
          await page.close();
          continue;
        }
      }

      await page.screenshot({ path: outPath, fullPage: p.fullPage || false });
      console.log(`Saved screenshot: ${p.name}.png`);
    } catch (err) {
      console.error(`Failed ${p.name}:`, err.message);
    }
    await page.close();
  }

  await browser.close();
}

capture();

