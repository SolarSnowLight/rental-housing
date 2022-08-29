import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "../constants/addresses/routes/auth.route";
import BuilderRoute from "../constants/addresses/routes/builder.route";
import CompanyRoute from "../constants/addresses/routes/company.route";
import MainRoute from "../constants/addresses/routes/main.route";

import SignInPage from "../containers/AuthPage/SignInPage";
import SignInPage2 from "../containers/AuthPage/SignInPage2";
import SignUpPage from "../containers/AuthPage/SignUpPage";
import BuilderPage from "../containers/BuilderPage";
import CompanyPage from "../containers/CompanyPage";
import HomePage from "../containers/HomePage";
import MainPage from "../containers/MainPage";

/* Базовые маршруты, которые доступны любому пользователю */
const useBaseRoutes = () => {
    return (
        <>
            {/*<Route path={MainRoute.home_page} element={<HomePage />} />*/}
            <Route path={MainRoute.home_page} element={<MainPage />} />
            <Route path={CompanyRoute.company_page} element={<CompanyPage />} />
            <Route path={BuilderRoute.builder_page} element={<BuilderPage />} />

            {/*<Route path={AuthRoute.sign_in_page} element={<SignInPage />} />*/}
            <Route path={AuthRoute.sign_in_page} element={<SignInPage2 />} />
            <Route path={AuthRoute.sign_up_page} element={<SignUpPage />} />

            <Route
                path="*"
                exact
                element={<Navigate to={MainRoute.home_page} />}
            />
        </>
    );
}

/* Хук, определяющий маршрутизацию приложения на внешнем уровне (глобальная маршрутизация) */
const useRoutes = (isAuthenticated) => {
    const baseRoutes = useBaseRoutes();

    // При авторизации пользователя ему будут доступны все страницы
    if (isAuthenticated) {
        return (
            <Routes>
                { baseRoutes }
            </Routes>
        );
    }

    // Если пользователь не авторизован, число страниц, которые он может посещать ограничено
    return (
        <Routes>
            { baseRoutes }
        </Routes>
    );
};

export default useRoutes;