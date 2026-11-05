const { execSync } = require('child_process');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
execSync(`"${CHROME}" --headless=new --disable-gpu --window-size=600,400 --screenshot="C:/Users/Tamil selvan Kumar/.gemini/antigravity/brain/044cb48c-762c-4418-82a6-3a872d567efd/test_sesame_img.png" "https://images.unsplash.com/photo-1778048840964-d221d23b86ee?auto=format&fit=crop&w=600&q=80"`);
console.log('done');

