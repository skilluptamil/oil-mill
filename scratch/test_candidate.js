const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

let html = fs.readFileSync('index.html', 'utf8');

// Inject the candidate CSS and click test
const testStyle = `
<style>
@media (min-width: 992px) {
  .navbar-nav .nav-item.dropdown {
    position: relative !important;
  }

  .navbar .dropdown-menu {
    position: absolute !important;
    top: calc(100% + 24px) !important;
    left: 0 !important;
    right: auto !important;
    min-width: 220px !important;
    margin: 0 !important;
    transform: none !important;
    background: var(--bg-surface) !important;
    border: 1px solid var(--border-color) !important;
    border-radius: var(--radius-md) !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.04) !important;
    padding: 0.6rem 0.5rem !important;
    z-index: 1060 !important;
  }

  .navbar .dropdown:hover > .dropdown-menu,
  .navbar .dropdown-menu.show {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  /* Invisible hover bridge */
  .navbar .dropdown-menu::before {
    content: '';
    position: absolute;
    top: -24px;
    left: 0;
    right: 0;
    height: 24px;
    background: transparent;
  }
}
</style>
`;

const clickScript = `
<script>
window.addEventListener('load', () => {
  const homeLink = document.querySelector('.dropdown-toggle');
  homeLink.click();

  setTimeout(() => {
    const header = document.querySelector('.site-header');
    const menu = document.querySelector('.navbar .dropdown-menu');
    const hr = header.getBoundingClientRect();
    const mr = menu.getBoundingClientRect();

    const data = {
      headerBottom: hr.bottom,
      menuTop: mr.top,
      menuBottom: mr.bottom,
      gapFromHeader: mr.top - hr.bottom,
      isBelowNavbar: mr.top >= hr.bottom
    };

    const tag = document.createElement('div');
    tag.id = 'TEST_RESULT';
    tag.setAttribute('data-res', JSON.stringify(data));
    document.body.appendChild(tag);
  }, 100);
});
</script>
`;

html = html.replace(/href="css\//g, 'href="../css/').replace(/src="assets\//g, 'src="../assets/');
html = html.replace('</head>', testStyle + '</head>');
html = html.replace('</body>', clickScript + '</body>');

fs.writeFileSync('scratch/candidate_test.html', html, 'utf8');

const fileUrl = 'file:///' + path.resolve('scratch/candidate_test.html').replace(/\\/g, '/');
const outShot = path.join(artifactDir, 'candidate_dropdown_desktop.png');

execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --screenshot="${outShot}" --window-size=1280,300 "${fileUrl}"`);
console.log('Screenshot taken!');

const output = execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=2000 --dump-dom --window-size=1280,800 "${fileUrl}"`, { encoding: 'utf8' });
const m = output.match(/id="TEST_RESULT" data-res="([^"]+)"/);
if (m) {
  const raw = m[1].replace(/&quot;/g, '"');
  console.log('Result:\n', JSON.stringify(JSON.parse(raw), null, 2));
}
