import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../language/languageSlice";
import notiSlice from "./notiSlice";
import productSlice from "../component/home/body/product/productSlice";

const store = configureStore({
    reducer: {
        language: languageSlice.reducer,
        noti: notiSlice.reducer,
        product: productSlice.reducer
    }
});

export default store;