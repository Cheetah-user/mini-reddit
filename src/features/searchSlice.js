import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async(subreddit, thunkAPI) => {
       const searchReddit = `http://www.reddit.com/search.json?q=${subreddit}`;
       const response = await fetch(searchReddit);
       const json = await response.json();
       return json.data.children;
    }
)

const searchSlice = createSlice({
    name: 'redditSearch',
    initialState: {
        results: [],
        isLoading: false,
        hasError: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
      builder
       .addCase(fetchSearchResults.pending, (state, action) => {
          state.isLoading = true;
          state.hasError = false;
       })
       .addCase(fetchSearchResults.fulfilled, (state, action) => {
          state.results = action.payload;
          state.isLoading = false;
          state.hasError = false;
       })
       .addCase(fetchSearchResults.rejected, (state, action) => {
          state.isLoading = false;
          state.hasError = true;
       })
    }
})

export {fetchSearchResults};
export default searchSlice.reducer;