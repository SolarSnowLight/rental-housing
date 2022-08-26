import { authSlice } from "../reducers/AuthSlice";

import MainApi from "../../constants/addresses/apis/main.api";
import AuthApi from "../../constants/addresses/apis/auth.api";

/* Функция для осуществления авторизации пользователя */
export const authSignIn = (data) => async (dispatch) => {
    try {
        // Вызов действия, отвечающего за начало отправки запроса
        dispatch(authSlice.actions.authLoading());

        // Отправка запроса на сервер
        const response = await fetch(
            (MainApi.main_server + AuthApi.sign_in),    // Формирование полного url адреса, на который отправляются данные
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })
            }
        );

        // Преобразование полученных данных в формат JSON
        const responseData = await response.json();

        // Обработка ошибок
        if (!response.ok) {
            dispatch(authSlice.actions.authError(responseData.message));
            return;
        }

        dispatch(authSlice.actions.signInSuccess(responseData));
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
};

/* Функция для считывания данных пользователя из local storage */
export const authUpdate = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.getAuthData());
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
};

/* Функция для выхода из системы */
export const authLogout = ({ auth }) => async (dispatch) => {
    try {
        // Вызов действия, отвечающего за начало отправки запроса
        dispatch(authSlice.actions.authLoading());

        // Отправка запроса на сервер
        const response = await fetch(
            (MainApi.main_server + AuthApi.logout),    // Формирование полного url адреса, на который отправляются данные
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.access_token}`
                }
            }
        );

        // Преобразование полученных данных в формат JSON
        const responseData = await response.json();

        // Обработка ошибок
        if (!response.ok) {
            dispatch(authSlice.actions.authError(responseData.message));
            return;
        }

        dispatch(authSlice.actions.logout());
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
}