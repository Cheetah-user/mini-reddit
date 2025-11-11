import { fetchSubReddit } from "../../features/redditSubSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearResults } from "../../features/searchSlice";



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
     <div>
       {subreddits.map(sub => (
         <div 
         key={sub.data.id}
         onClick={() => { 
            setSelectedSub(sub.data.display_name);
            dispatch(clearResults());
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