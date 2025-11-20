import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
const PORT = 5001;


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


app.get('/api/reddit/:subreddit', async (req, res) => {
  const { subreddit } = req.params;
  try {
    await delay(1000);
    const url = `https://www.reddit.com/r/${subreddit}.json`;
    console.log('Fetching:', url);
    const response = await fetch(url, {
      headers: { 'User-Agent': 'my-reddit-app/0.1 by myusername' }
    });
    if (!response.ok) {
      console.error('Reddit response not ok:', response.status, response.statusText);
      return res.status(500).json({ error: 'Reddit API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch from Reddit' });
  }
});


app.get('/api/reddit/comments/:subreddit/:postId', async (req, res) => {
  const { subreddit, postId } = req.params;
  try {
    await delay(10000);
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`, {
      headers: { 'User-Agent': 'my-reddit-app/0.1 by myusername' }
    });
    if(!response.ok){
      const errorData = await response.json();
      return
      res.status(response.status).json(errorData);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments from Reddit' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.get('/api/reddit/subreddits', async (req, res) =>{
  try{
    const response = await fetch('https://www.reddit.com/subreddits.json?limit=10', {
      headers: { 'User-Agent': 'my-reddit-app/0.1 by myusername' }
    });
   if(!response.ok) {
    console.error('Reddit response not ok:', response.status, response.statusText);
    return res.status(500).json({ error: `Reddit API error: ${response.status}${response.statusText}`});
   }
   const data = await response.json();
   res.json(data);
  }catch(error){
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch subreddits from Reddit' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});