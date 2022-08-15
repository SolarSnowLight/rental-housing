import { createSlice } from "@reduxjs/toolkit";
import storeConfig from "../../configs/store.config.json";

/* Базовое состояние для текущего слайса */
const initialState = {
    access_token: null,
    isAuthenticated: false,
    isLoading: false,
    error: "",
};

/* Создание нового слайса для авторизации и регистрации пользователя */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData(state, action) {
            state.access_token = action.payload.access_token;

            localStorage.setItem(
                storeConfig["main-store"],
                JSON.stringify({
                    ...state,
                })
            );
        },
        signIn(state) {
            state.isLoading = true;
        },
        signInSuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            console.log(action);
            state.access_token = action.payload.access_token;

            localStorage.setItem(
                storeConfig["main-store"],
                JSON.stringify({
                    ...state,
                })
            );
        },
        signInError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state, action) { },
    },
});

export default authSlice.reducer;