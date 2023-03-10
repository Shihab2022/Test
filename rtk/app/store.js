const configureStore = require("@reduxjs/toolkit").configureStore;
const videoReducer = require("../features/post/postSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

const store = configureStore({
    reducer: {
        video: videoReducer,
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;
