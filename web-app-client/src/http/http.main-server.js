/* Libraries */
import axios from "axios";

/* Context */
import store from "src/store/store";
import { refreshAccessToken } from "src/store/actions/AuthAction";

/* Constants */
import AuthApi from "src/constants/addresses/apis/auth.api";
import MainApi from "src/constants/addresses/apis/main.api";

/**
 * The basic constant for working with the API
 */
const apiMainServer = axios.create({
    withCredentials: true,
    baseURL: MainApi.main_server
});

/**
 * Adding a handler before sending a request
 */
apiMainServer.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getState().authReducer.access_token}`;
    return config;
});

/**
 * Adding a handler after receiving a response to a request
 */
apiMainServer.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if ((error.response.status == 401)
        && (error.config)
        && (!error.config._isRetry)) {
        originalRequest._isRetry = true;

        try {
            const response = await apiMainServer.post(`${AuthApi.refresh}`);

            store.dispatch(refreshAccessToken(response.data));
            return apiMainServer.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }

    throw error;
});

export default apiMainServer;