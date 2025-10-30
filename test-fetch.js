import fetch from 'node-fetch';
fetch('https://www.reddit.com/r/javascript.json', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
})
  .then(res => res.text())
  .then(console.log)
  .catch(console.error);