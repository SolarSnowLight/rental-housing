import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "src/constants/addresses/routes/auth.route";
import BuilderRoute from "src/constants/addresses/routes/builder.route";
import CompanyRoute from "src/constants/addresses/routes/company.route";
import MainRoute from "src/constants/addresses/routes/main.route";
import ManagerRoute, { ManagerRouteDefault } from "src/constants/addresses/routes/manager.route";
import BuilderAdminRoute, { BuilderAdminRouteDefault } from "src/constants/addresses/routes/builder.admin.route";
import AdminRoute, { AdminRouteDefault } from "src/constants/addresses/routes/admin.route";

import BuilderAdminPage from "src/containers/builder/admin/BuilderAdminPage";
import CompanyPage from "src/containers/client/CompanyPage";
import HomePage from "src/containers/client/HomePage";
import ManagerPage from "src/containers/manager/ManagerPage";
import AdminPage from "src/containers/admin/AdminPage";
import ObjectInfoPage from "src/containers/builder/manager/ObjectInfoPage";
import ObjectSearchPage from "src/containers/client/ObjectSearchPage";
import ManagerListPage from "src/containers/builder/admin/ManagerListPage";
import ProjectListPage from "src/containers/builder/admin/ProjectListPage";
import CreateProjectPage from "src/containers/builder/admin/CreateProjectPage";
import CreateObjectPage from "src/containers/builder/admin/CreateObjectPage";
import DeveloperEditPage from "src/containers/manager/DeveloperEditPage";
import ProjectInfoPage from "src/containers/builder/admin/ProjectInfoPage";

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
            <Route path={ManagerRouteDefault} >
                <Route path={ManagerRouteDefault} element={<ManagerPage/>} />
                <Route path={ManagerRoute.developerEdit} element={<DeveloperEditPage/>} />
            </Route>


            <Route path={BuilderAdminRouteDefault}>
                <Route path={BuilderAdminRouteDefault} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.company} element={<BuilderAdminPage />} />
                <Route path={BuilderAdminRoute.manager_list} element={<ManagerListPage />} />
                <Route path={BuilderAdminRoute.project_list} element={<ProjectListPage />} />
                <Route path={BuilderAdminRoute.project_create} element={<CreateProjectPage />} />
                <Route path={BuilderAdminRoute.project_info} element={<ProjectInfoPage />} />
                <Route path={BuilderAdminRoute.project_add_object} element={<CreateObjectPage />} />
            </Route>

        </Routes>
    );
};

export default useRoutes;