import { useEffect } from "react";
import { fetchLoadingComments } from "../../features/redditPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./comments.css";

const Comments = ({ subreddit, postId}) => {
    const dispatch = useDispatch();
    const emptyArray = [];
    const comments = useSelector((state) => state.feed.comments?.[postId] || emptyArray);
    const loadComment = useSelector((state) => state.feed.loadComment?.[postId]);
    const  errorComment= useSelector((state) => state.feed.errorComment?.[postId]);

    useEffect(() => {
        dispatch(fetchLoadingComments({subreddit, postId}));
    }, [dispatch, subreddit, postId]);

    if ((loadComment === undefined || loadComment) && comments.length === 0){ 
        return <div>Loading comments...</div>;
    }  

    if (errorComment){ 
        return <div>Error Loading Comments: {errorComment}</div>;
    }

    if(comments.length === 0){
        return <div>No comments found.</div>;
    }

    
    return (
        <div>
            {comments.map(comment => (
                <div className= "Comment-styling" key={comment.id}>
                    <strong>{comment.author}:</strong>
                    {comment.body}</div>
            ))}
        </div>
    )
}

export default Comments;