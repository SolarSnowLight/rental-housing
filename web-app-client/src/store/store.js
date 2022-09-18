import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "../store/reducers/AuthSlice";
import configReducer from "../store/reducers/ConfigSlice";
import adminReducer from "./reducers/AdminSlice";
import userReducer from "./reducers/UserSlice";
import companyReducer from "./reducers/CompanySlice";

/* Главный Reducer */
const rootReducer = combineReducers({
    authReducer,
    configReducer,
    adminReducer,
    userReducer,
    companyReducer
});

/* Функция инициализирующая основное хранилие */
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //middleware: (getDefaultMiddleware) =>
        //getDefaultMiddleware().concat(postAPI.middleware),
    });
};