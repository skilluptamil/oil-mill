const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let indexHtml = fs.readFileSync('index.html', 'utf8');

const testCss = `
.product-body {
  padding: 1.25rem 1rem !important;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.18rem !important;
  line-height: 1.35 !important;
  min-height: 3.2rem !important;
  margin-bottom: 0.5rem !important;
  color: var(--primary-dark);
}

.product-desc {
  font-size: 0.86rem !important;
  color: var(--text-muted);
  margin-bottom: 0.85rem !important;
  line-height: 1.5 !important;
  flex-grow: 1 !important;
}

.product-sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.85rem !important;
  min-height: 28px;
}

.product-footer {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 0.5rem !important;
  border-top: 1px solid var(--border-subtle);
  padding-top: 0.85rem !important;
  margin-top: auto !important;
  min-height: 52px !important;
}

.product-price {
  font-size: 1.12rem !important;
  font-weight: 800;
  color: var(--primary-dark);
  font-family: var(--font-sans);
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.product-price span {
  font-size: 0.78rem !important;
  font-weight: 400;
  color: var(--text-muted);
  white-space: nowrap !important;
}

.btn-enquire-product {
  background-color: var(--primary-subtle);
  color: var(--primary);
  border: 1px solid rgba(46, 78, 28, 0.25);
  font-size: 0.8rem !important;
  font-weight: 700;
  padding: 0.4rem 0.85rem !important;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem !important;
  cursor: pointer;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
  transition: all var(--transition-fast);
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .product-body {
    padding: 1.15rem 0.85rem !important;
  }
  .product-price {
    font-size: 1.05rem !important;
  }
  .btn-enquire-product {
    padding: 0.38rem 0.75rem !important;
    font-size: 0.78rem !important;
  }
}
`;

const sectionMatch = indexHtml.match(/<!-- =+\s+SECTION 3: OUR OIL PRODUCTS[\s\S]*?<\/section>/);

const isolatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Section 3 Mobile</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
  <style>
  ${testCss}
  </style>
</head>
<body style="background: #FDFBF7; padding: 20px 0; margin: 0;">
  ${sectionMatch[0]}
</body>
</html>`;

fs.writeFileSync('temp_render_mob.html', isolatedHtml, 'utf8');

[768, 375].forEach(w => {
  const out = `C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/verified_section3_${w}.png`;
  execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${out}" --window-size=${w},900 "file:///${path.resolve('temp_render_mob.html').replace(/\\/g, '/')}"`);
  console.log(`Saved verified shot for ${w}px`);
});

fs.unlinkSync('temp_render_mob.html');

