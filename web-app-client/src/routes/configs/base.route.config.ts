/* Containers */
import MainRoute from "src/constants/addresses/routes/main.route";
import CompanyPage from "src/containers/client/CompanyPage";
import ObjectsSearchPage from "src/containers/client/ObjectSearchPage";
import HomePage from "src/containers/client/HomePage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import CompanyRoute from "src/constants/addresses/routes/company.route";

/**
 * Configuration constants for internal routing of all pages
 */
const baseRouteConfig: IRouteModel[] = [
    {
        // URL: /company
        path: CompanyRoute.company_page,
        element: CompanyPage
    },

    {
        // URL: /objects-search
        path: MainRoute.objects_search,
        element: ObjectsSearchPage
    },

    {
        // URL: /home
        path: MainRoute.home_page,
        element: HomePage
    },
];

export default baseRouteConfig;