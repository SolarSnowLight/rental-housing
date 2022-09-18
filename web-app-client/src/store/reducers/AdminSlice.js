import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    response: null,
    isLoading: false,
    error: ""
};

/* Create a new clice for admin API */
export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },

        error(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearError(state) {
            state.error = "";
        },

        createCompanySuccess(state, action) {
            state.isLoading = false;
            state.error = "";
            state.response = action.payload;
        }
    },
});

export default adminSlice.reducer;