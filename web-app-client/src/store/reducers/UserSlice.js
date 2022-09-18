import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    company: null,
    isLoading: false,
    error: ""
};

/* Create a new clice for user API */
export const userSlice = createSlice({
    name: "user",
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

        getUserCompanySuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            if (action.payload) {
                state.company = action.payload;
            }
        }
    },
});

export default userSlice.reducer;