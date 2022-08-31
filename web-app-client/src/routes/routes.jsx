import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "../constants/addresses/routes/auth.route";
import BuilderRoute from "../constants/addresses/routes/builder.route";
import CompanyRoute from "../constants/addresses/routes/company.route";
import MainRoute from "../constants/addresses/routes/main.route";
import ManagerRoute from "../constants/addresses/routes/manager.route";

import SignInPage from "../containers/AuthPage/SignInPage";
import SignUpPage from "../containers/AuthPage/SignUpPage";
import BuilderPage from "../containers/BuilderPage";
import CompanyPage from "../containers/CompanyPage";
import HomePage from "../containers/HomePage";
import MainPage from "../containers/MainPage";
import ManagerPage from "../containers/Manager/ManagerPage";
import ObjectSearchPage from "../containers/ObjectSearchPage";

/* Базовые маршруты, которые доступны любому пользователю */
const useBaseRoutes = () => {
    return (
        <>
            <Route path={MainRoute.home_page} element={<HomePage />} />
            {/*<Route path={MainRoute.home_page} element={<MainPage />} />*/}
            <Route path={CompanyRoute.company_page} element={<CompanyPage />} />
            <Route path={BuilderRoute.builder_page} element={<BuilderPage />} />

            <Route path={'/object-search'} element={<ObjectSearchPage />} />

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
                {baseRoutes}

                { /* Проверка на роли должна быть перед выводом маршрутов (потом) */}

                <Route path={ManagerRoute.default} element={<ManagerPage />} />
            </Routes>
        );
    }

    // Если пользователь не авторизован, число страниц, которые он может посещать ограничено
    return (
        <Routes>
            {baseRoutes}

            { /* For tests */}
            <Route path={ManagerRoute.default} element={<ManagerPage />} />
        </Routes>
    );
};

export default useRoutes;