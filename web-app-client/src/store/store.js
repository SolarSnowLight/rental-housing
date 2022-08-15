import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/reducers/AuthSlice";
import configReducer from "../store/reducers/ConfigSlice";

/* Root Reducer */
const rootReducer = combineReducers({
    authReducer,
    configReducer
});

/* Export anonimous function for configure store */
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        //middleware: (getDefaultMiddleware) =>
        //getDefaultMiddleware().concat(postAPI.middleware),
    });
};