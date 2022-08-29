import { createSlice } from "@reduxjs/toolkit";
import storeConfig from "../../configs/store.config.json";
import AuthDataDto from "../../dtos/auth.data.dto";

/* Базовое состояние для текущего слайса */
const initialState = {
    access_token: null,
    isAuthenticated: false,
    isLoading: false,
    error: ""
};

/* Создание нового слайса для авторизации и регистрации пользователя */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /* Common function */
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

        getAuthData(state) {
            state.access_token = JSON.parse(localStorage.getItem(storeConfig["main-store"]))?.access_token;
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

        /* Function for SignIn */
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

        /* Function for logout */
        logout(state, action) {
            state.isLoading = false;
            state.error = "";
            state.access_token = null;
            state.isAuthenticated = false;

            localStorage.setItem(
                storeConfig["main-store"],
                undefined
            );
        },
    },
});

export default authSlice.reducer;