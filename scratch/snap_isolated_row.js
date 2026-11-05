const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/responsive.css">
</head>
<body style="background: #fdfbf7; padding: 40px 0;">
  <div class="container">
    <div class="row g-4">
` + fs.readFileSync('index.html', 'utf8').split('<div class="row g-4">')[1].split('</section>')[0];

fs.writeFileSync('scratch/isolated_products.html', html, 'utf8');

[1024, 1200, 1280].forEach(w => {
  execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${path.join(artifactDir, `cards_row_${w}.png`)}" --window-size=${w},850 "file:///${path.resolve('scratch/isolated_products.html').replace(/\\/g, '/')}"`);
  console.log(`Saved cards_row_${w}.png`);
});
