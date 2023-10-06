import { createSelector } from "@reduxjs/toolkit";
// select component nao thi trong foulder tu tao 1 selector
export const selectLanguage = (state) => {
    return state.post;
}

export const selectPost2 = (state) => {
    return state.post;
}

export const selectPost3 = createSelector(selectLanguage, selectPost2, (post1, post2) => {
    return post1 == post2 ? 1 : ""
})