import { useEffect } from "react";
import { fetchLoadingComments } from "../../features/redditPageSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Comments = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.redditPage.comments);
    const loadComment = useSelector((state) => state.redditPage.loadComment);
    const  errorComment= useSelector((state) => state.redditPage.errorComment);

    useEffect(() => {
        dispatch(fetchLoadingComments(postId));
    }, [dispatch, postId]);

    if (loadComment) return <div>Loading...</div>;  
    if (errorComment) return <div>Error Loading Comments.</div>

    return (
        <div>
            {comments.map(comment => (
                <div key={comment.id}>{comment.text}</div>
            ))}
        </div>
    )
}

export default Comments;