import { companySlice } from "../reducers/CompanySlice";

import apiMainServer from "src/http/http.main-server";
import AdminApi from "src/constants/addresses/apis/admin.api";

/* Function for get company for current user */
export const getAllProjectsByCompany = (uuid) => async (dispatch) => {
    try {
        dispatch(companySlice.actions.loading());

        const response = await apiMainServer.post(AdminApi.get_all_users, JSON.stringify({
            uuid: uuid
        }));
        
        if (response.status != 200 && response.status != 201) {
            dispatch(companySlice.error(response.data.message));
            return;
        }

        dispatch(companySlice.actions.getAllProjectsSuccess(response.data));
    } catch (e) {
        dispatch(companySlice.actions.error(e.message));
    }
}
