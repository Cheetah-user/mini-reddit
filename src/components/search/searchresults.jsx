import { useSelector } from "react-redux";
import SearchBar from "./searchbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLoadingPosts } from "../../features/redditPageSlice";
import Post from "../posts/post";
import "../posts/posts.css";


const SearchResult = ({subreddit}) => {
    const results = useSelector((state) => 
        state.redditSearch.results);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.feed.posts);

    useEffect(() => {
        if(subreddit){
          dispatch(fetchLoadingPosts(subreddit))
        }else{
        dispatch(fetchLoadingPosts("javascript"));
        }
    }, [dispatch, subreddit]);

    const displayPosts = results.length > 0 ? results : posts;

    return (
        <>
        <SearchBar/>
        <div>
            <div className="postsContainer">
            {displayPosts.map(post => (
                <Post key={post.data.id} post={post.data}/>
            ))}
            </div>
        </div>
        </>
    );
};

export default SearchResult;