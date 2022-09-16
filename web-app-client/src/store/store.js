import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/reducers/AuthSlice";
import configReducer from "../store/reducers/ConfigSlice";
import adminReducer from "../store/reducers/admin/AdminSlice";

/* Главный Reducer */
const rootReducer = combineReducers({
    // Common
    authReducer,
    configReducer,

    // Specific
    adminReducer
});

/* Функция инициализирующая основное хранилие */
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //middleware: (getDefaultMiddleware) =>
        //getDefaultMiddleware().concat(postAPI.middleware),
    });
};