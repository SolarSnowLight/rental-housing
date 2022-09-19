import { createSlice } from "@reduxjs/toolkit";
import storeConfig from "../../configs/store.config.json";
import AuthDataDto from "../../dtos/auth.data.dto";

/* Base state for current slice */
const initialState = {
    access_token: null,
    isAuthenticated: false,
    isLoading: false,
    error: ""
};

/* Create a new clice for sign-in and sign-up */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Global functions
        authLoading(state) {
            state.isLoading = true;
        },
        authError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        authClearError(state) {
            state.error = "";
        },
        clearData(state) {
            state.isLoading = false;
            state.error = "";
            state.access_token = null;
            state.isAuthenticated = false;
        },
        getAuthData(state) {
            const mainStore = localStorage.getItem(storeConfig["main-store"]);

            if (mainStore) {
                state.access_token = JSON.parse(mainStore)?.access_token;
            } else {
                state.access_token = null;
            }

            state.isAuthenticated = !!state.access_token;
            state.error = "";
        },
        setAuthData(state, action) {
            state.access_token = action.payload.access_token;
            state.isAuthenticated = !!state.access_token;

            localStorage.setItem(
                storeConfig["main-store"],
                JSON.stringify({
                    ...(new AuthDataDto(state)),
                })
            );
        },

        // Function for SignIn
        signInSuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            state.access_token = action.payload.access_token;
            state.isAuthenticated = !!state.access_token;

            localStorage.setItem(
                storeConfig["main-store"],
                JSON.stringify({
                    ...(new AuthDataDto(state)),
                })
            );
        },

        // Functions for SignUp
        signUpSuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            state.access_token = action.payload.access_token;
            state.isAuthenticated = !!state.access_token;

            localStorage.setItem(
                storeConfig["main-store"],
                JSON.stringify({
                    ...(new AuthDataDto(state)),
                })
            );
        },

        // Functions for logout
        logout(state, action) {
            state.isLoading = false;
            state.error = "";
            state.access_token = null;
            state.isAuthenticated = false;

            localStorage.removeItem(storeConfig["main-store"]);
        },
    },
});

export default authSlice.reducer;