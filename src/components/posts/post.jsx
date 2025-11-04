import { useState } from "react";
import Comments from '../comments/comments'

const Post = ({post}) => {
    console.log(post);
    const title = post.title || "No title";
    const author = post.author || "Unknown";
    const upVote = post.ups ?? 0;
    const downVote = post.downs ?? 0;
    let imageUrl = '';
    let timeSincePosted = '';
    const createdUtc = post.created_utc ?? 0;
    const [showComments, setShowComments] = useState(false);
  
    if (post.thumbnail && post.thumbnail.startsWith('http')) {
      imageUrl = post.thumbnail;
    } else if (post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif'))) {
      imageUrl = post.url;
    }
  
    const now = Math.floor(Date.now() / 1000);
    const secondsAgo = now - createdUtc;
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(secondsAgo / 3600);
    const daysAgo = Math.floor(secondsAgo / 86400);
    
    if (secondsAgo < 60) {
      timeSincePosted = `Posted ${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
      timeSincePosted = `Posted ${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
      timeSincePosted = `Posted ${hoursAgo} hours ago`;
    } else {
      timeSincePosted = `Posted ${daysAgo} days ago`;
    }
  
      return (
          <div>
            <h2>{title}</h2>
            <p>By {author}</p>
            {imageUrl && <img src={imageUrl} alt={title}/>}
            <p>UpVotes: {upVote} | DownVotes: {downVote}</p>
            <p>{timeSincePosted}</p>
            <button onClick={() => setShowComments(!showComments)}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
            {showComments && (
              <Comments subreddit={post.subreddit} postId={post.id} />
            )}
          </div>
      )
  }
  
  export default Post;