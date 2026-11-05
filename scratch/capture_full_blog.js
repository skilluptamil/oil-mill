const { execSync } = require('child_process');

const PROJECT_DIR = 'C:/Users/Tamil selvan Kumar/Documents/projects/Oil mill';
const ARTIFACTS_DIR = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tests = [
  {
    name: 'blog_grid_1280',
    url: `file:///${PROJECT_DIR}/blog.html`,
    out: `${ARTIFACTS_DIR}/verified_blog_full_1280.png`,
    size: '1280,2200'
  },
  {
    name: 'blog_grid_768',
    url: `file:///${PROJECT_DIR}/blog.html`,
    out: `${ARTIFACTS_DIR}/verified_blog_768.png`,
    size: '768,2600'
  },
  {
    name: 'blog_grid_375',
    url: `file:///${PROJECT_DIR}/blog.html`,
    out: `${ARTIFACTS_DIR}/verified_blog_375.png`,
    size: '375,3200'
  },
  {
    name: 'blog_details_sesame',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=sesame-palm-jaggery`,
    out: `${ARTIFACTS_DIR}/verified_blog_sesame_updated_1280.png`,
    size: '1280,1800'
  },
  {
    name: 'blog_details_vaagai',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=vaagai-wood-chekku`,
    out: `${ARTIFACTS_DIR}/verified_blog_vaagai_1280.png`,
    size: '1280,1800'
  }
];

for (const t of tests) {
  console.log(`Capturing: ${t.name}`);
  const cmd = `"${CHROME}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --window-size=${t.size} --screenshot="${t.out}" "${t.url}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Saved: ${t.out}`);
}

console.log('All comprehensive screenshots captured!');

