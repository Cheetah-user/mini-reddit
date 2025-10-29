import { useEffect } from "react";
import { fetchLoadingPosts } from "../../features/redditPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.redditPage.posts);
    const loadposts = useSelector((state) => state.redditPage.loadposts);
    const errorposts = useSelector((state) => state.redditPage.errorposts);

    useEffect(() => {
        dispatch(fetchLoadingPosts());
    }, [dispatch]);

    if (loadposts) return <div>Loading...</div>;
    if (errorposts) return <div>Error Loading Posts</div>

    return (
        <div>
            {posts.map(post => {
                <div key={post.id}>{post.title}</div>
            })}
        </div>
    )
}

export default Posts;