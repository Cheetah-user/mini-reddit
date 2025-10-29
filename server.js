import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 5000;

app.get('/api/reddit/:subreddit', async (req, res) => {
    const { subreddit } = req.params;
    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch from Reddit'});
    }
  });

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});