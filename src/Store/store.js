import  configureStore  from "@reduxjs/toolkit";
import  redditSubReducer  from "../features/redditSubSlice";
import  redditPageReducer  from "../features/redditPageSlice";
import  searchReducer  from "../features/searchSlice";

 
const store  = configureStore({
    reducer: {
        redditSub: redditSubReducer,
        redditPage: redditPageReducer,
        search: searchReducer
    }
});

export default store;