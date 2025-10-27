import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export const fetchLoadingPosts = createAsyncThunk(
    'posts/fetchLoadingPosts',
    async(subreddit, thunkAPI) => {
        const redditAPI = `https://www.reddit.com/r/${subreddit}.json`;
        const response = await fetch(redditAPI);
        const json = await response.json();
        return json.data.children;
    }
)

export const fetchLoadingComments = createAsyncThunk(
    'comments/fetchLoadingComments',
    async({subreddit, postId}, thunkAPI) => {
        const redditAPI = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;
        const response = await fetch(redditAPI);
        const json = await response.json();
        return json[1].data.children;
    }
)

export const redditPageSlice = createSlice({
    name: 'redditPage',
    initialState: {
        posts: [],
        comments: [],
        loadposts: false,
        errorposts: false,
        loadcomment: false,
        errorcomment: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        //the extra reducers for post
     builder
       .addCase(fetchLoadingPosts.pending, (state, action) =>{
        state.loadposts = true;
        state.errorposts = false;
      })
       .addCase(fetchLoadingPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loadposts = false;
        state.errorposts = false;
      })
      .addCase(fetchLoadingPosts.rejected, (state, action) => {
        state.loadposts = false;
        state.errorposts = true;
      })

      //extra reducers for comments
      .addCase(fetchLoadingComments.pending, (state, action) => {
        state.loadcomment = true;
        state.errorcomment = false;
      })
      .addCase(fetchLoadingComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loadcomment = false;
        state.errorcomment = false;
      })
      .addCase(fetchLoadingComments.rejected, (state, action) => {
        state.loadcomment = false;
        state.errorcomment = true;
      })
    }
})

export default redditPageSlice.reducer;