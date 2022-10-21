/* Containers */
import MainRoute from "src/constants/addresses/routes/main.route";
import CompanyPage from "src/containers/client/CompanyPage";
import ObjectSearchPage from "src/containers/client/ObjectSearchPage";

/* Models */
import IRouteModel from "src/models/IRouteModel";

/* Constants */
import CompanyRoute from "src/constants/addresses/routes/company.route";

/**
 * Configuration constants for internal routing of all pages
 */
const baseRouteConfig: IRouteModel[] = [
    {
        path: CompanyRoute.company_page,
        element: CompanyPage
    },

    {
        path: MainRoute.objects_search,
        element: ObjectSearchPage
    },
];

export default baseRouteConfig;