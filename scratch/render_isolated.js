const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract section 3
const sectionMatch = indexHtml.match(/<!-- =+\s+SECTION 3: OUR OIL PRODUCTS[\s\S]*?<\/section>/);
if (!sectionMatch) {
  console.error('Section 3 not found');
  process.exit(1);
}

const isolatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Section 3 Test</title>
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/responsive.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
</head>
<body style="background: #FDFBF7; padding: 20px 0;">
  ${sectionMatch[0]}
</body>
</html>`;

fs.writeFileSync('scratch/isolated_section3.html', isolatedHtml, 'utf8');

[1280, 1200, 1024].forEach(w => {
  const out = path.resolve(`scratch/section3_${w}.png`).replace(/\\/g, '/');
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=${w},900 "file:///${path.resolve('scratch/isolated_section3.html').replace(/\\/g, '/')}"`);
  console.log(`Saved screenshot for ${w}px`);
});

