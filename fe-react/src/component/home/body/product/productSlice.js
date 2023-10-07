import { createSlice } from "@reduxjs/toolkit";
const INIT_PRODUCT = {
    isLoading: false,
    product: [{}, {}, {}, {}, {}]
}
export default createSlice({
    name: "product",
    initialState: INIT_PRODUCT,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
})