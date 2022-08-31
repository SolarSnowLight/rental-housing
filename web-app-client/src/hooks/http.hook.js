import { useState, useCallback, useContext } from "react";
import AuthApi from "../constants/addresses/apis/auth.api";
import MainApi from "../constants/addresses/apis/main.api";
import { authSlice } from "../store/reducers/AuthSlice";
import { useAppSelector } from "./redux.hook";

const useHttp = (baseUrl = MainApi.main_server) => {
    const auth = useAppSelector(state => state.authReducer);
    const authActions = authSlice.actions;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const originalRequest = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + url), 
                { 
                    method, 
                    body, 
                    headers 
                }
            );

            const data = await response.json();
            setLoading(false);

            return {
                response,
                data
            };
        } catch(e){
            setLoading(false);
            setError(e.message);

            // for tests
            console.log(e.message);
        }

        return {
            response: null,
            data: null
        };
    }, []);

    const refreshToken = useCallback(async (token) => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + AuthApi.refresh),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: token,
                    })
                }
            );

            const data = await response.json();

            if(response.ok){
                authActions.setAuthData({
                    users_id: data.users_id,
                    type_auth: data.type_auth,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    attributes: data.attributes,
                    modules: data.modules
                });
            }

            setLoading(false);

            return data;
        } catch(e){
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }, multipart = false) => {
        setLoading(true);
        try {
            if(body && (!headers['Content-Type']) && (!multipart)){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            if(auth.access_token){
                headers['Authorization'] = `Bearer ${auth.access_token}`;
            }

            let { response, data } = await originalRequest(url, method, body, headers);

            // Status Code 401 - Unauthorized
            // Проработать refresh token
            /*if(response?.status === 401){
                const request = await refreshToken(auth.refresh_token, auth.type_auth);
                headers['Authorization'] = `Bearer ${request.type_auth} ${request.access_token}`;

                const updateResponse = await originalRequest(url, method, body, headers);

                response = updateResponse.response;
                data = updateResponse.data;
            }*/

            setLoading(false);

            return data;
        } catch(e){
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;