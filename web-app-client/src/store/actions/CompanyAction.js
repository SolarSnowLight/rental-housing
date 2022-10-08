/* Context */
import { companySlice } from "../reducers/CompanySlice";
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http.main-server";

/* Constants */
import CompanyApi from "src/constants/addresses/apis/company.api";

/* Get all projects for define company */
const getAllProjectsByCompany = (access_token, uuid, add = false, count = 0, limit = 10) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {
        const response = await apiMainServer.post(
            CompanyApi.get_all_projects,
            JSON.stringify({
                uuid: uuid,
                count: count,
                limit: limit
            }),
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.ResponseHandling(response.data.message, "error"));
            return;
        }

        if (add) {
            dispatch(companySlice.actions.getAllProjectsAddSuccess(response.data));
        } else {
            dispatch(companySlice.actions.getAllProjectsSuccess(response.data));
        }
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(companySlice.actions.loadingEnd());
}

/* Get all managers for define company */
const getAllManagersByCompany = (access_token, uuid, add = false, count = 0, limit = 10) => async (dispatch) => {
    dispatch(companySlice.actions.loadingStart());

    try {

        const response = await apiMainServer.post(
            CompanyApi.get_all_managers,
            JSON.stringify({
                uuid: uuid,
                count: count,
                limit: limit
            }),
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction.ResponseHandling(response.data.message, "error"));
            return;
        }

        if (add) {
            dispatch(companySlice.actions.getAllManagersAddSuccess(response.data));
        } else {
            dispatch(companySlice.actions.getAllManagersSuccess(response.data));
        }
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(companySlice.actions.loadingEnd());
}

const clearCompanyInformation = () => async (dispatch) => {
    dispatch(companySlice.actions.clear());
}

const companyAction = {
    getAllProjectsByCompany,
    getAllManagersByCompany,
    clearCompanyInformation
};

export default companyAction;