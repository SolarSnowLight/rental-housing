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
                }),
                credentials: "same-origin"
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

/* Функция для осуществления регистрации пользователя */
export const authSignUp = (data, profileImage) => async (dispatch) => {
    try {
        // Вызов действия, отвечающего за начало отправки запроса
        dispatch(authSlice.actions.authLoading());

        // Отправка запроса на сервер
        const response = await fetch(
            (MainApi.main_server + AuthApi.sign_up),    // Формирование полного url адреса, на который отправляются данные
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                }),
                credentials: "same-origin"
            }
        );

        // Преобразование полученных данных в формат JSON
        const responseData = await response.json();

        // Обработка ошибок
        if (!response.ok) {
            dispatch(authSlice.actions.authError(responseData.message));
            return;
        }

        console.log(profileImage);
        // Загрузка пользователю изображение профиля
        if (profileImage) {
            const formData = new FormData();
            formData.append("file", profileImage);

            const responseProfileImage = await fetch(
                (MainApi.main_server + AuthApi.upload_profile_image),    // Формирование полного url адреса, на который отправляются данные
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + responseData.access_token
                    },
                    body: formData,
                    credentials: "same-origin"
                }
            );
        }

        dispatch(authSlice.actions.signUpSuccess(responseData));
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
export const authLogout = (access_token) => async (dispatch) => {
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
                    'Authorization': `Bearer ${access_token}`
                },
                credentials: "same-origin"
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