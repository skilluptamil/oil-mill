const fs = require('fs');
const path = require('path');

const imgPath = 'C:\\Users\\Tamil selvan Kumar\\.gemini\\antigravity\\brain\\044cb48c-762c-4418-82a6-3a872d567efd\\.user_uploaded\\media_1793878462027_3ae6edc9.jpg';

const stats = fs.statSync(imgPath);
console.log('Image exists, size:', stats.size);

