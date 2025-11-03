import { useEffect } from "react";
import { fetchLoadingPosts } from "../../features/redditPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Post from "./post";


const Posts = () => {
    const posts = useSelector((state) => state.feed.posts);
    const isLoading = useSelector((state) => state.feed.loadpost);
    const error = useSelector((state) => state.feed.errorposts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoadingPosts('javascript'));
    }, [dispatch]);

    if(isLoading) {
        return (
            <div>
              <p>Loading...</p>
            </div>
        )
    }

    if(error) {
      return (
        <div>
          {error}
        </div>
      )
    }

    if(posts.length === 0) {
      return (
        <div>
          <p>No Posts Found</p>
        </div>
      )
    }

    return (
        <>
          {posts
            .filter(post => post.data && post.data.title && post.data.author && post.data.created_utc)
            .map(post => (
            <Post key={post.data.id} post={post.data}/>
           ))}
        </>
    )
}

export default Posts; 