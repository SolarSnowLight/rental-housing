import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/reducers/AuthSlice";
import configReducer from "../store/reducers/ConfigSlice";

/* Главный Reducer */
const rootReducer = combineReducers({
    authReducer,
    configReducer
});

/* Функция инициализирующая основное хранилие */
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //middleware: (getDefaultMiddleware) =>
        //getDefaultMiddleware().concat(postAPI.middleware),
    });
};