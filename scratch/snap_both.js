const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

// Let's create a test HTML file that renders the header and footer together, just like the user's screenshot!
const indexContent = fs.readFileSync('index.html', 'utf8');

// Extract header and footer
let headerMatch = indexContent.match(/<header class="site-header">[\s\S]*?<\/header>/);
let footerMatch = indexContent.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

let headerHtml = headerMatch ? headerMatch[0].replace(/src="assets\//g, 'src="../assets/') : '';
let footerHtml = footerMatch ? footerMatch[0].replace(/src="assets\//g, 'src="../assets/') : '';

const testHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Header & Footer Test</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/dark-mode.css">
  <link rel="stylesheet" href="../css/rtl.css">
  <link rel="stylesheet" href="../css/responsive.css">
</head>
<body style="background: #F8FAF6; min-height: 100vh; display: flex; flex-direction: column; justify-content: space-between;">
  ${headerHtml}
  <div style="padding: 40px; text-align: center; color: #555;">
    <h3>Page Content Area (Test Preview)</h3>
    <p>Cold-pressed oil mill website template</p>
  </div>
  ${footerHtml}
</body>
</html>`;

fs.writeFileSync('scratch/test_preview.html', testHtml, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/test_preview.html').replace(/\\/g, '/');
const outPreviewLight = path.join(artifactDir, 'preview_light.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outPreviewLight}" --window-size=1280,850 "${fileUrl}"`);
console.log('preview_light.png generated!');

// Also create dark mode version!
const testHtmlDark = testHtml.replace('<html lang="en">', '<html lang="en" data-theme="dark">');
fs.writeFileSync('scratch/test_preview_dark.html', testHtmlDark, 'utf8');
const fileUrlDark = 'file:///' + path.resolve('scratch/test_preview_dark.html').replace(/\\/g, '/');
const outPreviewDark = path.join(artifactDir, 'preview_dark.png');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outPreviewDark}" --window-size=1280,850 "${fileUrlDark}"`);
console.log('preview_dark.png generated!');
