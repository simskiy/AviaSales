import { configureStore } from "@reduxjs/toolkit";

import sortReducer from "./sortSlice";
import filterReducer from "./filterSlice"

export default configureStore({
    reducer: {
        sortTicket: sortReducer,
        filterTicket: filterReducer
    }
})
