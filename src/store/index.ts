import { configureStore } from "@reduxjs/toolkit";

import sortReducer from "./sortSlice";

export default configureStore({
    reducer: {
        sortTicket: sortReducer
    }
})
