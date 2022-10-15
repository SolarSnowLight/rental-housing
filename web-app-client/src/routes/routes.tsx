/* Libraries */
import { Routes, Route, Navigate } from "react-router-dom";

/* Containers */
import BuilderAdminPage from "src/containers/builder/admin/BuilderAdminPage";
import HomePage from "src/containers/client/HomePage";
import ManagerPage from "src/containers/manager/ManagerPage";
import AdminPage from "src/containers/admin/AdminPage";
import ManagerListPage from "src/containers/builder/admin/ManagerListPage";
import ProjectListPage from "src/containers/builder/admin/ProjectListPage";
import CreateProjectPage from "src/containers/builder/admin/CreateProjectPage";
import CreateObjectPage from "src/containers/builder/admin/CreateObjectPage";
import ProjectInfoPage from "src/containers/builder/admin/ProjectInfoPage";
import CompanyPage from "src/containers/client/CompanyPage";
import ObjectSearchPage from "src/containers/client/ObjectSearchPage";
import BuilderEditPage from "src/containers/manager/BuilderEditPage";
import ClientListPage from "src/containers/builder/manager/ClientListPage";
import BuilderManagerPage from "src/containers/builder/manager/ManagerPage";
import BuilderStatisticsPage from "src/containers/manager/BuilderStatisticsPage";
import ProjectInfoBuilderManagerPage from "src/containers/builder/manager/ProjectInfoPage";
import ObjectInfoBuilderManagerPage from 'src/containers/builder/manager/ObjectInfoPage'

/* Constants */
import AuthRoute from "src/constants/addresses/routes/auth.route";
import BuilderRoute from "src/constants/addresses/routes/builder.route";
import CompanyRoute from "src/constants/addresses/routes/company.route";
import MainRoute from "src/constants/addresses/routes/main.route";
import ManagerRoute, { ManagerRouteDefault } from "src/constants/addresses/routes/manager.route";
import BuilderAdminRoute, { BuilderAdminRouteDefault } from "src/constants/addresses/routes/builder.admin.route";
import AdminRoute, { AdminRouteDefault } from "src/constants/addresses/routes/admin.route";
import { BuilderManagerRoutes } from "src/constants/addresses/routes/builder.manager.routes";

import WithToastify from "src/hoc-helpers/WithToastify";

/* Base routes for every users */
const useBaseRoutes = () => {
    return (
        <>
            <Route path={MainRoute.home_page} element={<HomePage />} />
            <Route path={CompanyRoute.company_page} element={<CompanyPage />} />
            <Route path={MainRoute.objects_search} element={<ObjectSearchPage />} />

            <Route path="*" element={<Navigate to={MainRoute.home_page} />} />
        </>
    );
}

/* Hook for all routes*/
const useRoutes = (isAuthenticated) => {
    return (
        <Routes>
            {useBaseRoutes()}

            <Route path={AdminRouteDefault} element={<AdminPage/>} />
            <Route path={ManagerRouteDefault}>
                <Route path={ManagerRouteDefault} element={<ManagerPage/>} />
                <Route path={ManagerRoute.builderEdit} element={<BuilderEditPage/>} />
                <Route path={ManagerRoute.builderStatistics} element={<BuilderStatisticsPage/>} />
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

            <Route path={BuilderManagerRoutes.common}>
                <Route path={BuilderManagerRoutes.default} element={<BuilderManagerPage/>} />
                <Route path={BuilderManagerRoutes.clients} element={<ClientListPage/>} />
                <Route path={BuilderManagerRoutes.objectInfo} element={<ObjectInfoBuilderManagerPage/>} />
                <Route path={BuilderManagerRoutes.projectInfo} element={<ProjectInfoBuilderManagerPage />} />
            </Route>

        </Routes>
    );
};

export default WithToastify(useRoutes);