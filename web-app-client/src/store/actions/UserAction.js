import { userSlice } from "src/store/reducers/UserSlice";

import MainApi from "src/constants/addresses/apis/main.api";
import UserApi from "src/constants/addresses/apis/user.api";
import axios from "axios";
import storeConfig from "../../configs/store.config.json";
import apiMainServer from "src/http/http.main-server";
import AuthApi from "src/constants/addresses/apis/auth.api";
import { authSlice } from "../reducers/AuthSlice";

/* Function for get company for current user */
export const getUserCompany = (access_token) => async (dispatch) => {
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
            dispatch(userSlice.error(response.data.message));
            return;
        }

        dispatch(userSlice.actions.getUserCompanySuccess(response.data));
    };

    try {
        dispatch(userSlice.actions.loading());
        await originalRequest(access_token);
    } catch (e) {
        dispatch(userSlice.actions.clearData());
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
                dispatch(userSlice.error(response.data.message));
                return;
            }

            dispatch(authSlice.actions.signInSuccess(response.data));
            await originalRequest(response.data.access_token);
        }
        dispatch(userSlice.actions.error(e.message));
    }
}

const userAction = {
    getUserCompany
};

export default userAction;
