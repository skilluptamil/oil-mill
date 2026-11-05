const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

const sectionMatch = indexHtml.match(/<!-- =+\s+SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/);

const darkHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Section 4 Dark Mode</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/dark-mode.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body style="background: #111611; padding: 20px 0; margin: 0;">
  ${sectionMatch[0]}
</body>
</html>`;

fs.writeFileSync('temp_dark_why.html', darkHtml, 'utf8');
const out = `C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/verified_why_choose_dark.png`;
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=1280,850 "file:///${path.resolve('temp_dark_why.html').replace(/\\/g, '/')}"`);
fs.unlinkSync('temp_dark_why.html');
console.log('Saved dark mode shot');

