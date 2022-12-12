import { configureStore } from "@reduxjs/toolkit";

import mainReducer from './mainSlice'

export default configureStore({
    reducer: {
        reducer: mainReducer
    }
})
