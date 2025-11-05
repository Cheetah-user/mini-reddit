import { useSelector } from "react-redux";
import SearchBar from "./searchbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLoadingPosts } from "../../features/redditPageSlice";
import Post from "../posts/post";


const SearchResult = () => {
    const results = useSelector((state) => 
        state.redditSearch.results);
    console.log(results);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.feed.posts);

    useEffect(() => {
        dispatch(fetchLoadingPosts("javascript"));
    }, [dispatch]);

    const displayPosts = results.length > 0 ? results : posts;

    return (
        <div>
            <SearchBar/>
            {displayPosts.map(post => (
                <Post key={post.data.id} post={post.data}/>
            ))}
        </div>
    );
};

export default SearchResult;