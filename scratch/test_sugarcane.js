const https = require('https');

https.get('https://images.unsplash.com/photo-1650192388648-65800ec59fee?auto=format&fit=crop&w=600&q=80', res => {
  console.log(`photo-1650192388648-65800ec59fee statusCode: ${res.statusCode}`);
});

