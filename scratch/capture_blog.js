const { execSync } = require('child_process');
const path = require('path');

const PROJECT_DIR = 'C:/Users/Tamil selvan Kumar/Documents/projects/Oil mill';
const ARTIFACTS_DIR = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const tests = [
  {
    name: 'blog_listing',
    url: `file:///${PROJECT_DIR}/blog.html`,
    out: `${ARTIFACTS_DIR}/verified_blog_listing_1280.png`
  },
  {
    name: 'blog_cold_pressed',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=cold-pressed-vs-refined`,
    out: `${ARTIFACTS_DIR}/verified_blog_cold_pressed_1280.png`
  },
  {
    name: 'blog_sesame_jaggery',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=sesame-palm-jaggery`,
    out: `${ARTIFACTS_DIR}/verified_blog_sesame_jaggery_1280.png`
  },
  {
    name: 'blog_groundnut_smoke',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=smoke-point-groundnut-oil`,
    out: `${ARTIFACTS_DIR}/verified_blog_groundnut_smoke_1280.png`
  },
  {
    name: 'blog_gingelly_pulling',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=gingelly-oil-pulling`,
    out: `${ARTIFACTS_DIR}/verified_blog_gingelly_pulling_1280.png`
  },
  {
    name: 'blog_coconut_tests',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=virgin-coconut-oil-tests`,
    out: `${ARTIFACTS_DIR}/verified_blog_coconut_tests_1280.png`
  }
];

for (const t of tests) {
  console.log(`Capturing: ${t.name}`);
  const cmd = `"${CHROME}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --window-size=1280,1050 --screenshot="${t.out}" "${t.url}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Done: ${t.out}`);
}

console.log('All screenshots completed successfully!');

