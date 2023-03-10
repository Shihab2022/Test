const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
    loading: false,
    videos: [],
    error: "",
};

const fetchRelatedVideos = createAsyncThunk("video/fetchRelatedVideos", async (url) => {
    const response = await fetch(
        `${url}`
    );
    const relatedVideos = await response.json();
const sortRelatedVideos=relatedVideos.sort((a, b) =>parseFloat(b?.views?.slice(0, -1)) -parseFloat( a?.views?.slice(0, -1)) )
    return sortRelatedVideos;
});

const relatedVideoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRelatedVideos.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.videos = action.payload;
        });

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.videos = [];
        });
    },
});

module.exports = relatedVideoSlice.reducer;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
