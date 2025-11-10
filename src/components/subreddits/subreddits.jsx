import { fetchSubReddit } from "../../features/redditSubSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Posts from "../posts/posts";



const SubReddit = ({setSelectedSub}) => {
    const dispatch = useDispatch();
    const subreddits = useSelector((state) => state.redditSub.subreddits);
    const isLoading = useSelector((state) => state.redditSub.isLoading);
    const hasError = useSelector((state) => state.redditSub.hasError);

    console.log('SubReddit rendered', { subreddits, isLoading, hasError });

   useEffect(() => {
     dispatch(fetchSubReddit());
     console.log('useEffect running');
   }, [dispatch]);

   if(isLoading){
    return <div>Loading...</div>
   }

   if(hasError){
    return <div>Error Loading: {hasError}</div>
   }

  
   return(
     <div>
       {subreddits.map(sub => (
         <div 
         key={sub.data.id}
         onClick={() => { 
            console.log("Clicked:", sub.data.display_name);
            setSelectedSub(sub.data.display_name);
        }}
         >
           <img
            src={sub.data.icon_img || "https://www.redditstatic.com/icon.png"}
            alt={sub.data.display_name}
           />
           {sub.data.display_name_prefixed}
         </div>
       ))}
     </div>
   )

}

export default SubReddit;