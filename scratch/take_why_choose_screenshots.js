const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

const sectionMatch = indexHtml.match(/<!-- =+\s+SECTION 4: WHY CHOOSE US[\s\S]*?<\/section>/);

const isolatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Section 4 Verified</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body style="background: #FDFBF7; padding: 20px 0; margin: 0;">
  ${sectionMatch[0]}
</body>
</html>`;

fs.writeFileSync('temp_why_render.html', isolatedHtml, 'utf8');

[1280, 1024].forEach(w => {
  const out = `C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/verified_why_choose_${w}.png`;
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=${w},850 "file:///${path.resolve('temp_why_render.html').replace(/\\/g, '/')}"`);
  console.log(`Saved screenshot for ${w}px`);
});

fs.unlinkSync('temp_why_render.html');

