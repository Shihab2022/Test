const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const store = require("../../app/store");
const { fetchRelatedVideos } = require("../relatedVideo/relatedVideo");

const initialState = {
    loading: false,
    video: [],
    error: "",
};

let baseUrl='http://localhost:9000/videos'
const fetchVideo = createAsyncThunk("video/fetchVideo", async (dd) => {
    const response = await fetch(
        `${baseUrl}`
    );
    const video = await response.json();
    if(video?.tags){
const allTags=video?.tags
for (let i = 0; i < allTags.length; i++) {
    if(i===0){
        baseUrl=`${baseUrl}?tags_like=${allTags[i]}` 
    }
    else{
        baseUrl=`${baseUrl}&tags_like=${allTags[i]}` 
    }
  }
store.dispatch(fetchRelatedVideos(baseUrl));
    }
    return video;
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.video = action.payload;
        });

        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.video = [];
        });
    },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
