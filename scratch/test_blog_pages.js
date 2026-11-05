const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = 'c:\\Users\\Tamil selvan Kumar\\Documents\\projects\\Oil mill';
const ARTIFACTS_DIR = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';
const PORT = 8089;
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(PROJECT_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);

  try {
    const urls = [
      {
        url: `http://localhost:${PORT}/blog.html`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_listing_1280.png'),
        name: 'Blog Listing Page'
      },
      {
        url: `http://localhost:${PORT}/blog-details.html?id=cold-pressed-vs-refined`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_details_cold_pressed_1280.png'),
        name: 'Cold-Pressed vs Refined Article'
      },
      {
        url: `http://localhost:${PORT}/blog-details.html?id=sesame-palm-jaggery`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_details_sesame_jaggery_1280.png'),
        name: 'Sesame & Palm Jaggery Article'
      },
      {
        url: `http://localhost:${PORT}/blog-details.html?id=smoke-point-groundnut-oil`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_details_groundnut_smoke_1280.png'),
        name: 'Smoke Point Groundnut Oil Article'
      },
      {
        url: `http://localhost:${PORT}/blog-details.html?id=gingelly-oil-pulling`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_details_oil_pulling_1280.png'),
        name: 'Gingelly Oil Pulling Article'
      },
      {
        url: `http://localhost:${PORT}/blog-details.html?id=virgin-coconut-oil-tests`,
        out: path.join(ARTIFACTS_DIR, 'verified_blog_details_coconut_tests_1280.png'),
        name: 'Virgin Coconut Oil Tests Article'
      }
    ];

    for (const item of urls) {
      console.log(`Capturing: ${item.name} (${item.url})`);
      const cmd = `"${CHROME}" --headless=new --disable-gpu --window-size=1280,1050 --screenshot="${item.out}" "${item.url}"`;
      execSync(cmd, { stdio: 'pipe' });
      console.log(`Saved screenshot to: ${item.out}`);
    }

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    server.close(() => {
      console.log('Test server closed.');
      process.exit(0);
    });
  }
});

