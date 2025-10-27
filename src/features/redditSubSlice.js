import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubReddit = createAsyncThunk(
   'subreddit/fetchSubReddit',
   async(_, thunkAPI) => {
     const redditAPI = `https://www.reddit.com/subreddits/popular.json`;
     const response = await fetch(redditAPI);
     const json = await response.json();
     return json.data.children;
   }
)

const redditSubSlice = createSlice({
    name: 'redditSub',
    initialState: {
        subreddit: [],
        isLoading: false,
        hasError: false
    },
    reducers: {

    }, 
    extraReducers: (builder) => {
        builder
         .addCase(fetchSubReddit.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
         })
         .addCase(fetchSubReddit.fulfilled, (state, action) => {
            state.subreddit = action.payload;
            state.isLoading = false;
            state.hasError = false;
         })
         .addCase(fetchSubReddit.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
         })
    }
})

export default redditSubSlice.reducer;