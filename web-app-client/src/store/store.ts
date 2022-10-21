/* Libraries */
import { combineReducers, configureStore } from "@reduxjs/toolkit";

/* Context */
import authReducer from "./reducers/AuthSlice";
import configReducer from "./reducers/ConfigSlice";
import adminReducer from "./reducers/AdminSlice";
import userReducer from "./reducers/UserSlice";
import companyReducer from "./reducers/CompanySlice";
import projectReducer from "./reducers/ProjectSlice";
import messageQueueReducer from "./reducers/MessageQueueSlice";

/* Constants */
import storageConfig from "../configs/store.config.json";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

/* Главный Reducer */
const rootReducer = combineReducers({
    authReducer,
    configReducer,
    adminReducer,
    userReducer,
    companyReducer,
    projectReducer,
    messageQueueReducer
});

const persistConfig = {
    key: storageConfig["main-store"],
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = () => {
  return store;
}

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];