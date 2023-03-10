const store = require("./app/store");
const { fetchVideo } = require("./features/Post/postSlice");
store.dispatch(fetchVideo());

