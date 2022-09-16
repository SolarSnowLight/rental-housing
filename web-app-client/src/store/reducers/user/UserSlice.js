import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    response: null,
    isLoading: false,
    error: ""
};

/* Create a new clice for user API */
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoading(state) {
            state.isLoading = true;
        },

        userError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        userClearError(state) {
            state.error = "";
        },

        getAllUsersSuccess(state, action) {
            state.isLoading = false;
            state.error = "";
            state.response = action.payload;
        }
    },
});

export default userSlice.reducer;