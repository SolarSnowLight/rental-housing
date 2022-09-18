import { userSlice } from "src/store/reducers/UserSlice";

import MainApi from "src/constants/addresses/apis/main.api";
import UserApi from "src/constants/addresses/apis/user.api";
import axios from "axios";
import storeConfig from "../../configs/store.config.json";
import apiMainServer from "src/http/http.main-server";

/* Function for get company for current user */
export const getUserCompany = () => async (dispatch) => {
    try {
        dispatch(userSlice.actions.loading());

        const response = await apiMainServer.post(UserApi.get_user_company);
        
        if (response.status != 200 && response.status != 201) {
            dispatch(userSlice.error(response.data.message));
            return;
        }

        dispatch(userSlice.actions.getUserCompanySuccess(response.data));
    } catch (e) {
        dispatch(userSlice.actions.error(e.message));
    }
}
