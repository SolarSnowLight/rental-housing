export const AuthRouteDefault = "/auth";

/* Главные маршруты в веб-приложении */
const AuthRoute = {
    // Адрес домашней страницы
    sign_up_page: `${AuthRouteDefault}/sign-up`,
    sign_in_page: `${AuthRouteDefault}/sign-in`,
    recovery_password_page: `${AuthRouteDefault}/recovery/password`,
    reset_password_page: `${AuthRouteDefault}/reset/password`,

    // Адрес по-умолчанию
    default: AuthRouteDefault
};

export default AuthRoute;