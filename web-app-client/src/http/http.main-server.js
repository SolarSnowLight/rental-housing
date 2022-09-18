import axios from "axios";
import AuthApi from "src/constants/addresses/apis/auth.api";
import MainApi from "src/constants/addresses/apis/main.api";
import storeConfig from "../configs/store.config.json";
import { useAppDispatch } from "src/hooks/redux.hook";
import { authSlice } from "src/store/reducers/AuthSlice";

const apiMainServer = axios.create({
    withCredentials: true,
    baseURL: MainApi.main_server
});

apiMainServer.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(storeConfig["main-store"])).access_token}`;
    return config;
});

apiMainServer.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();

    // Для повтора исходного запроса
    const originalRequest = error.config;

    // Обновление токена
    if ((error.response.status == 401)
        && (error.config)
        && (!error.config._isRetry)) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post(`${AuthApi.refresh}`, {
                withCredentials: true,
            });

            dispatch(authActions.setAuthData(response.data.access_token));
            return apiMainServer.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }

    throw error;
});

export default apiMainServer;