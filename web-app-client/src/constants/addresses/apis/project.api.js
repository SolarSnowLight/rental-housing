export const ProjectApiBase = "/project";

const ProjectApi = {
    get_all_projects: `/company${ProjectApiBase}/get/all`,
    create_project: `/company${ProjectApiBase}/create`,
    project_add_logo: `/company${ProjectApiBase}/add/logo`
};

export default ProjectApi;