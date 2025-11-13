import { fetchSubReddit } from "../../features/redditSubSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearResults } from "../../features/searchSlice";
import "./subreddit.css";


const SubReddit = ({setSelectedSub}) => {
    const dispatch = useDispatch();
    const subreddits = useSelector((state) => state.redditSub.subreddits);
    const isLoading = useSelector((state) => state.redditSub.isLoading);
    const hasError = useSelector((state) => state.redditSub.hasError);


   useEffect(() => {
     dispatch(fetchSubReddit());
   }, [dispatch]);

   if(isLoading){
    return <div>Loading...</div>
   }

   if(hasError){
    return <div>Error Loading: {hasError}</div>
   }

  
   return(
     <div className="subredditStyling">
      <h2>SubReddits</h2>
       {subreddits.map(sub => (
         <div 
         className="sub-spacing"
         key={sub.data.id}
         onClick={() => { 
            setSelectedSub(sub.data.display_name);
            dispatch(clearResults());
        }}
         >
           <img
            src={sub.data.icon_img || "https://www.redditstatic.com/icon.png"}
            alt={sub.data.display_name}
            className="image-style"
           />
           {sub.data.display_name_prefixed}
         </div>
       ))}
     </div>
   )

}

export default SubReddit;