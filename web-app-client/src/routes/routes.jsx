import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "../constants/addresses/routes/auth.route";
import BuilderRoute from "../constants/addresses/routes/builder.route";
import CompanyRoute from "../constants/addresses/routes/company.route";
import MainRoute from "../constants/addresses/routes/main.route";
import ManagerRoute, { ManagerRouteDefault } from "../constants/addresses/routes/manager.route";
import BuilderAdminRoute, { BuilderAdminRouteDefault } from "../constants/addresses/routes/builder.admin.route";
import AdminRoute, { AdminRouteDefault } from "../constants/addresses/routes/admin.route";

import SignInPage from "../containers/AuthPage/SignInPage";
import SignUpPage from "../containers/AuthPage/SignUpPage";
import BuilderAdminPage from "src/containers/Builder/BuilderAdminPage";
import CompanyPage from "../containers/CompanyPage";
import HomePage from "../containers/HomePage";
import MainPage from "../containers/MainPage";
import ManagerPage from "../containers/Manager/ManagerPage";
import AdminPage from "../containers/Admin/AdminPage";
import ObjectSearchPage from "../containers/ObjectSearchPage";
import ManagerListPage from "src/containers/Builder/BuilderAdminPage/ManagerListPage";

/* Базовые маршруты, которые доступны любому пользователю */
const useBaseRoutes = () => {
    return (
        <>
            <Route path={MainRoute.home_page} element={<HomePage />} />
            {/*<Route path={MainRoute.home_page} element={<MainPage />} />*/}
            <Route path={CompanyRoute.company_page} element={<CompanyPage />} />

            <Route path={'/object-search'} element={<ObjectSearchPage />} />

            {
                /*<Route
                path="*"
                exact
                element={<Navigate to={MainRoute.home_page} />}
            /> */
            }
        </>
    );
}

/* Хук, определяющий маршрутизацию приложения на внешнем уровне (глобальная маршрутизация) */
const useRoutes = (isAuthenticated) => {
    return (
        <Routes>
            {useBaseRoutes()}
            <Route path={AdminRouteDefault} element={<AdminPage />} />
            <Route path={ManagerRouteDefault} element={<ManagerPage />} />

            <Route path={BuilderAdminRouteDefault}>
                <Route path={BuilderAdminRouteDefault} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.company} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.manager_list} element={<ManagerListPage />} />
            </Route>

            {
                /*<Route
                    path="*"
                    exact
                    element={<Navigate to={MainRoute.home_page} />}
                />*/
            }
        </Routes>
    );

    // При авторизации пользователя ему будут доступны все страницы
    /*if (isAuthenticated) {
        return (
            <Routes>
                {baseRoutes}
                <Route path={AdminRoute.default} element={<AdminPage />} />
                <Route path={ManagerRoute.default} element={<ManagerPage />} />

                {
                    <Route
                        path="*"
                        exact
                        element={<Navigate to={MainRoute.home_page} />}
                    />
                }
            </Routes>
        );
    } else {
        // Если пользователь не авторизован, число страниц, которые он может посещать ограничено
        return (
            <Routes>
                {baseRoutes}
                <Route path={AdminRouteDefault} element={<AdminPage />} />
                <Route path={ManagerRouteDefault} element={<ManagerPage />} />

                <Route path={BuilderAdminRouteDefault} element={<BuilderAdminPage />}>
                    {  Nested routes of the admin }
                    <Route path={BuilderAdminRoute.company} element={<BuilderAdminPage />} />
                </Route>
                {
                    <Route
                        path="*"
                        exact
                        element={<Navigate to={MainRoute.home_page} />}
                    />
                }
            </Routes>
        );
    }*/

};

export default useRoutes;