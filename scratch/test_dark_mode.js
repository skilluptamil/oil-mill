const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_DIR = 'C:/Users/Tamil selvan Kumar/Documents/projects/Oil mill';
const ARTIFACTS_DIR = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let blogHtml = fs.readFileSync(`${PROJECT_DIR}/blog.html`, 'utf8');
blogHtml = blogHtml.replace('<head>', '<head><script>localStorage.setItem("chekku_theme", "dark");</script>');
fs.writeFileSync(`${PROJECT_DIR}/temp_dark_blog.html`, blogHtml, 'utf8');

let blogDetailsHtml = fs.readFileSync(`${PROJECT_DIR}/blog-details.html`, 'utf8');
blogDetailsHtml = blogDetailsHtml.replace('<head>', '<head><script>localStorage.setItem("chekku_theme", "dark");</script>');
fs.writeFileSync(`${PROJECT_DIR}/temp_dark_blog_details.html`, blogDetailsHtml, 'utf8');

try {
  execSync(`"${CHROME}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --window-size=1280,1400 --screenshot="${ARTIFACTS_DIR}/verified_blog_dark_1280.png" "file:///${PROJECT_DIR}/temp_dark_blog.html"`);
  execSync(`"${CHROME}" --headless=new --disable-gpu --run-all-compositor-stages-before-draw --window-size=1280,1400 --screenshot="${ARTIFACTS_DIR}/verified_blog_details_dark_1280.png" "file:///${PROJECT_DIR}/temp_dark_blog_details.html?id=cold-pressed-vs-refined"`);
  console.log('Dark mode screenshots captured successfully!');
} finally {
  if (fs.existsSync(`${PROJECT_DIR}/temp_dark_blog.html`)) fs.unlinkSync(`${PROJECT_DIR}/temp_dark_blog.html`);
  if (fs.existsSync(`${PROJECT_DIR}/temp_dark_blog_details.html`)) fs.unlinkSync(`${PROJECT_DIR}/temp_dark_blog_details.html`);
}
