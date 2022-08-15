export const AuthApiMain = "/auth";

/* Константы адресов, для работы с авторизацией и регистрацией */
const AuthApi = {
    // Авторизация и регистрация
    sign_in: `${AuthApiMain}/sign-in`,
    sign_up: `${AuthApiMain}/sign-up`,
    oauth: `${AuthApiMain}/sign-in/oauth2`,
    logout: `${AuthApiMain}/logout`,

    // Обновление токена
    refresh: `${AuthApiMain}/refresh`,

    // Сброс и изменение пароля
    recovery_password: `${AuthApiMain}/recovery/password`,
    reset_password: `${AuthApiMain}/reset/password`,
};

export default AuthApi;