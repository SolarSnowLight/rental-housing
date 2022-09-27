export const ProjectApiBase = "/project";
export const CompanyApiBase = "/company";

const CompanyApi = {
    get_all_projects: `${CompanyApiBase}${ProjectApiBase}/get/all`,
    get_all_managers: `${CompanyApiBase}/manager/get/all`,
    create_project: `${CompanyApiBase}${ProjectApiBase}/create`,
    project_add_logo: `${CompanyApiBase}${ProjectApiBase}/add/logo`
};

export default CompanyApi;