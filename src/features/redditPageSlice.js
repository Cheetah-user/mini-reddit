import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


 const fetchLoadingPosts = createAsyncThunk(
    'feed/fetchLoadingPosts',
    async(subreddit, thunkAPI) => {
        const response = await fetch(`/api/reddit/${subreddit}`);
        const data = await response.json();
        console.log(data);
        if(!data.data || !data.data.children){
            return [];
        }
        const fetched = data.data.children;
        return fetched;
    }
)

 const fetchLoadingComments = createAsyncThunk(
    'feed/fetchLoadingComments',
    async({subreddit, postId}, thunkAPI) => {
        const response = await fetch(`/api/reddit/comments/${subreddit}/${postId}`);
        const data = await response.json();
        console.log(data);
        const fetched = data[1]?.data?.children || [];
        console.log('children:', data[1]?.data?.children);
        return {postId, comments: fetched};
    }
)

export const redditPageSlice = createSlice({
    name: 'feed',
    initialState: {
        posts: [],
        comments: {},
        loadposts: false,
        errorposts: null,
        loadcomment: {},
        errorcomment: {}
    },
    reducers: {

    },
    extraReducers: (builder) => {
        //the extra reducers for post
     builder
       .addCase(fetchLoadingPosts.pending, (state, action) =>{
        state.loadposts = true;
        state.errorposts = null;
      })
       .addCase(fetchLoadingPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loadposts = false;
        state.errorposts = null;
      })
      .addCase(fetchLoadingPosts.rejected, (state, action) => {
        state.loadposts = false;
        state.errorposts = action.error.message;
      })

      //extra reducers for comments
      .addCase(fetchLoadingComments.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.loadcomment = true;
        state.errorcomment = null;
      })
      .addCase(fetchLoadingComments.fulfilled, (state, action) => {
        const {postId, comments} = action.payload;
        state.comments[postId] = comments;
        state.loadcomment = false;
        state.errorcomment = null;
      })
      .addCase(fetchLoadingComments.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.loadcomment[postId] = false;
        state.errorcomment[postId] = action.error.message;
      })
    }
})

export default redditPageSlice.reducer;
export {fetchLoadingComments, fetchLoadingPosts};