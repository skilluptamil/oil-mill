const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

const sectionMatch = indexHtml.match(/<!-- =+\s+SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/);

// Option A: Left-aligned with min-height on h4, flex column, perfect baseline
const htmlA = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
  <style>
  .feature-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .feature-card h4 {
    min-height: 3.4rem;
    line-height: 1.35;
    margin-bottom: 0.75rem;
  }
  .feature-card p {
    flex-grow: 1;
    line-height: 1.6;
  }
  </style>
</head>
<body style="background: #FDFBF7; padding: 30px 0;">
  ${sectionMatch[0]}
</body>
</html>`;

// Option B: Center-aligned (text-center, mx-auto) with min-height on h4
const sectionMatchB = sectionMatch[0]
  .replace(/class="feature-card"/g, 'class="feature-card text-center"')
  .replace(/class="feature-icon-wrapper"/g, 'class="feature-icon-wrapper mx-auto"');

const htmlB = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
  <style>
  .feature-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .feature-card h4 {
    min-height: 3.4rem;
    line-height: 1.35;
    margin-bottom: 0.75rem;
  }
  .feature-card p {
    flex-grow: 1;
    line-height: 1.6;
  }
  </style>
</head>
<body style="background: #FDFBF7; padding: 30px 0;">
  ${sectionMatchB}
</body>
</html>`;

fs.writeFileSync('temp_opt_a.html', htmlA, 'utf8');
fs.writeFileSync('temp_opt_b.html', htmlB, 'utf8');

execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/option_a_left_aligned.png" --window-size=1280,850 "file:///${path.resolve('temp_opt_a.html').replace(/\\/g, '/')}"`);
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/option_b_centered.png" --window-size=1280,850 "file:///${path.resolve('temp_opt_b.html').replace(/\\/g, '/')}"`);

fs.unlinkSync('temp_opt_a.html');
fs.unlinkSync('temp_opt_b.html');
console.log('Saved both options!');

