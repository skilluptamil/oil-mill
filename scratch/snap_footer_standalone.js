const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const indexHtml = fs.readFileSync('index.html', 'utf8');
const footerMatch = indexHtml.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);

const createPage = (theme) => `<!DOCTYPE html>
<html lang="en" dir="ltr" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/dark-mode.css">
  <link rel="stylesheet" href="../css/rtl.css">
  <link rel="stylesheet" href="../css/responsive.css">
</head>
<body style="margin: 0; background-color: ${theme === 'dark' ? '#111611' : '#F8FAF6'};">
  <div style="height: 40px;"></div>
  ${footerMatch ? footerMatch[0].replace(/src="assets\//g, 'src="../assets/') : ''}
</body>
</html>`;

fs.writeFileSync('scratch/footer_light.html', createPage('light'), 'utf8');
fs.writeFileSync('scratch/footer_dark.html', createPage('dark'), 'utf8');

const urlLight = 'file:///' + path.resolve('scratch/footer_light.html').replace(/\\/g, '/');
const urlDark = 'file:///' + path.resolve('scratch/footer_dark.html').replace(/\\/g, '/');

const outLight = path.join(artifactDir, 'footer_light_rendered.png');
const outDark = path.join(artifactDir, 'footer_dark_rendered.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outLight}" --window-size=1280,560 "${urlLight}"`);
console.log('Light footer captured');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outDark}" --window-size=1280,560 "${urlDark}"`);
console.log('Dark footer captured');

