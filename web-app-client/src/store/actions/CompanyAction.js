import { companySlice } from "../reducers/CompanySlice";

import apiMainServer from "src/http/http.main-server";
import AdminApi from "src/constants/addresses/apis/admin.api";
import ProjectApi from "src/constants/addresses/apis/project.api";

/* Function for get company for current user */
const getAllProjectsByCompany = (uuid, add = false, count = 0, limit = 10) => async (dispatch) => {
    try {
        dispatch(companySlice.actions.loading());

        const response = await apiMainServer.post(ProjectApi.get_all_projects, JSON.stringify({
            uuid: uuid,
            count: count,
            limit: limit
        }));

        if (response.status != 200 && response.status != 201) {
            dispatch(companySlice.actions.clearData());
            dispatch(companySlice.error(response.data.message));
            return;
        }

        if (add) {
            dispatch(companySlice.actions.getAllProjectsAddSuccess(response.data));
        } else {
            dispatch(companySlice.actions.getAllProjectsSuccess(response.data));
        }
    } catch (e) {
        dispatch(companySlice.actions.clearData());
        dispatch(companySlice.actions.error(e.message));
    }
}

const clearCompanyInformation = () => async (dispatch) => {
    dispatch(companySlice.actions.clear());
}

const companyAction = {
    getAllProjectsByCompany,
    clearCompanyInformation
};

export default companyAction;