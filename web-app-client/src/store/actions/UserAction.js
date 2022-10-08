/* Context */
import { userSlice } from "src/store/reducers/UserSlice";
import { authSlice } from "src/store/reducers/AuthSlice";
import messageQueueAction from "./MessageQueueAction";

/* Http */
import apiMainServer from "src/http/http.main-server";

/* Constants */
import MainApi from "src/constants/addresses/apis/main.api";
import UserApi from "src/constants/addresses/apis/user.api";
import AuthApi from "src/constants/addresses/apis/auth.api";
import CompanyApi from "src/constants/addresses/apis/company.api";

/* Function for get company for current user */
export const getUserCompany = (access_token) => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    const originalRequest = async (accessToken) => {
        const response = await apiMainServer.post(
            UserApi.get_user_company,
            null,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        response.data.data.logo = [{
            data_url: `${MainApi.main_server}/${response.data.data.logo.replace('\\', '/')}`
        }];

        dispatch(userSlice.actions.getUserCompanySuccess({
            ...response.data,
        }));
    };

    try {
        await originalRequest(access_token);
    } catch (e) {
        dispatch(userSlice.actions.clear());

        if (e.response.status == 401) {
            const response = await apiMainServer.post(
                AuthApi.refresh,
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            );

            if (response.status != 200 && response.status != 201) {
                dispatch(messageQueueAction(response.data.message, "error"));
                return;
            }

            dispatch(authSlice.actions.signInSuccess(response.data));
            await originalRequest(response.data.access_token);
        }

        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(userSlice.actions.loadingEnd());
}

/* Function for update information about company for current user */
const companyInfoUpdate = (access_token, data, logo) => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try {

        let response = await apiMainServer.post(
            CompanyApi.update,
            JSON.stringify(data),
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );

        if ((logo) && (!(response.status != 200 && response.status != 201))) {
            const formData = new FormData();

            formData.append("uuid", data.uuid);
            formData.append("logo", logo);

            response = await apiMainServer.post(
                CompanyApi.update_image,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            );
        }

        if (response.status != 200 && response.status != 201) {
            dispatch(messageQueueAction(response.data.message, "error"));
            return;
        }

        dispatch(messageQueueAction.ResponseHandling(response, "success", "Информации о компании успешно обновлена"));
        dispatch(userSlice.actions.updateCompanySuccess(response.data));
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(userSlice.actions.loadingEnd());
}

const setItemCompanyInfo = (item, value) => async (dispatch) => {
    dispatch(userSlice.actions.loadingStart());

    try {
        dispatch(userSlice.actions.setItemCompanyInfo({ item, value }));
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(userSlice.actions.loadingEnd());
};

const userAction = {
    getUserCompany,
    companyInfoUpdate,
    setItemCompanyInfo
};

export default userAction;
