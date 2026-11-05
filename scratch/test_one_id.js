const https = require('https');

https.get('https://images.unsplash.com/photo-1506690952427-2bea8cd8773d?auto=format&fit=crop&w=400&q=80', res => {
  console.log(`photo-1506690952427-2bea8cd8773d statusCode: ${res.statusCode}`);
});

