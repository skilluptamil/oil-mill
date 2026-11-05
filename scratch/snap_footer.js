const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd';

const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const outFooter = path.join(artifactDir, 'current_footer.png');

// Use a tall window or scroll to footer
// Let's capture the whole page or scroll down using a script
const htmlWithScroll = `
<!DOCTYPE html>
<html>
<head>
<script>
window.onload = function() {
  window.scrollTo(0, document.body.scrollHeight);
};
</script>
</head>
<body>
</body>
</html>
`;

// Better: execute Chrome with a window height that captures footer or full page screenshot
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outFooter}" --window-size=1280,3000 "${fileUrl}"`);
console.log('Done full page screenshot');

