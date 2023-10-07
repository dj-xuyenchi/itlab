import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../language/languageSlice";
import notiSlice from "./notiSlice";

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
        noti: notiSlice.reducer
    }
});

export default store;