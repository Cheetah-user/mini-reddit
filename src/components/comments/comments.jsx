import { useEffect } from "react";
import { fetchLoadingComments } from "../../features/redditPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Comments = ({ subreddit, postId}) => {
    const dispatch = useDispatch();
    const emptyArray = [];
    const comments = useSelector((state) => state.feed.comments?.[postId] || emptyArray);
    const loadComment = useSelector((state) => state.feed.loadComment?.[postId]);
    const  errorComment= useSelector((state) => state.feed.errorComment?.[postId]);

    console.log('comments for', postId, comments);
    console.log('feed state:', useSelector((state) => state.feed));
    useEffect(() => {
        dispatch(fetchLoadingComments({subreddit, postId}));
    }, [dispatch, subreddit, postId]);

    if (loadComment) return <div>Loading...</div>;  
    if (errorComment) return <div>Error Loading Comments.</div>

    console.log('comments:', comments);
    return (
        <div>
            {comments.length === 0 && <div>No comments found.</div>}
            {comments.map(comment => (
                <div key={comment.id}>
                    <strong>{comment.author}</strong>
                    {comment.body}</div>
            ))}
        </div>
    )
}

export default Comments;