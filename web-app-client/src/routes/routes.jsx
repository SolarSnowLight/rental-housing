import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "../constants/addresses/routes/auth.route";
import BuilderRoute from "../constants/addresses/routes/builder.route";
import CompanyRoute from "../constants/addresses/routes/company.route";
import MainRoute from "../constants/addresses/routes/main.route";
import ManagerRoute, { ManagerRouteDefault } from "../constants/addresses/routes/manager.route";
import BuilderAdminRoute, { BuilderAdminRouteDefault } from "../constants/addresses/routes/builder.admin.route";
import AdminRoute, { AdminRouteDefault } from "../constants/addresses/routes/admin.route";

import SignInPage from "../containers/auth/SignInPage";
import SignUpPage from "../containers/auth/SignUpPage";
import BuilderAdminPage from "src/containers/builder/admin/BuilderAdminPage";
import CompanyPage from "../containers/client/CompanyPage";
import HomePage from "../containers/client/HomePage";
import ManagerPage from "../containers/manager/ManagerPage";
import AdminPage from "../containers/admin/AdminPage";
import ObjectSearchPage from "../containers/client/ObjectSearchPage";
import ManagerListPage from "src/containers/builder/admin/BuilderAdminPage/containers/ManagerListPage";
import ProjectListPage from "../containers/builder/admin/BuilderAdminPage/containers/ProjectListPage";
import CreateProjectPage from "src/containers/builder/admin/BuilderAdminPage/containers/CreateProjectPage";
import CreateObjectPage from "src/containers/builder/admin/BuilderAdminPage/containers/CreateObjectPage";
import DeveloperEditPage from "../containers/manager/DeveloperEditPage";
import {BuilderManagerRoutes} from "../constants/addresses/routes/builder.manager.routes";
import ClientList from "../containers/builder/manager/ClientListPage";
import BuilderManagerDefaultPage from "../containers/builder/manager/ManagerPage";
import ObjectInfoPage from "../containers/builder/manager/ObjectInfoPage";
import DeveloperStatistics from "src/containers/manager/DeveloperStatistics/DeveloperStatistics";

/* Базовые маршруты, которые доступны любому пользователю */
const useBaseRoutes = () => {
    return (
        <>
            <Route path={MainRoute.home_page} element={<HomePage />} />
            <Route path={CompanyRoute.company_page} element={<CompanyPage />} />

            <Route path={'/object-search'} element={<ObjectSearchPage />} />

            {
                <Route
                    path="*"
                    element={<Navigate to={MainRoute.home_page} />}
                />
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
            <Route path={ManagerRouteDefault}>
                <Route path={ManagerRouteDefault} element={<ManagerPage/>} />
                <Route path={ManagerRoute.developerEdit} element={<DeveloperEditPage/>} />
                <Route path={ManagerRoute.developersStatistics} element={<DeveloperStatistics/>} />
            </Route>


            <Route path={BuilderAdminRouteDefault}>
                <Route path={BuilderAdminRouteDefault} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.company} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.manager_list} element={<ManagerListPage />} />
                <Route path={BuilderAdminRoute.project_list} element={<ProjectListPage />} />
                <Route path={BuilderAdminRoute.project_create} element={<CreateProjectPage />} />
                <Route path={BuilderAdminRoute.project_add_object} element={<CreateObjectPage />} />
            </Route>

            <Route path={BuilderManagerRoutes.common}>
                <Route path={BuilderManagerRoutes.default} element={<BuilderManagerDefaultPage/>} />
                <Route path={BuilderManagerRoutes.clients} element={<ClientList/>} />
                <Route path={BuilderManagerRoutes.objectInfo} element={<ObjectInfoPage/>} />
            </Route>

        </Routes>
    );
};

export default useRoutes;