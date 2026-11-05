const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

const footerMatch = indexHtml.match(/<!-- =+\s+FOOTER[\s\S]*?<\/footer>/);

const isolatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body style="background: #FDFBF7; padding: 0; margin: 0;">
  ${footerMatch[0]}
</body>
</html>`;

fs.writeFileSync('temp_isolated_footer.html', isolatedHtml, 'utf8');
const out = 'C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/verified_footer_updated.png';
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=1280,480 "file:///${path.resolve('temp_isolated_footer.html').replace(/\\/g, '/')}"`);
fs.unlinkSync('temp_isolated_footer.html');
console.log('Saved isolated footer shot');

