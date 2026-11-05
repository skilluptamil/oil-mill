const { execSync } = require('child_process');

const PROJECT_DIR = 'C:/Users/Tamil selvan Kumar/Documents/projects/Oil mill';
const ARTIFACTS_DIR = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const script = `
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
`;

const tests = [
  {
    name: 'blog_dark_1280',
    url: `file:///${PROJECT_DIR}/blog.html`,
    out: `${ARTIFACTS_DIR}/verified_blog_dark_1280.png`
  },
  {
    name: 'blog_details_dark_1280',
    url: `file:///${PROJECT_DIR}/blog-details.html?id=cold-pressed-vs-refined`,
    out: `${ARTIFACTS_DIR}/verified_blog_details_dark_1280.png`
  }
];

// We can launch with --run-all-compositor-stages-before-draw and evaluate script or inject dark theme in test html
for (const t of tests) {
  const cmd = `"${CHROME}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --window-size=1280,1050 --screenshot="${t.out}" "${t.url}"`;
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Saved: ${t.out}`);
}

