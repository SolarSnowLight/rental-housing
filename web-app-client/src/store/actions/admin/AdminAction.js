import { adminSlice } from "src/store/reducers/admin/AdminSlice";

import MainApi from "src/constants/addresses/apis/main.api";
import AdminApi from "src/constants/addresses/apis/admin.api";
import axios from "axios";
import apiMainServer from "src/http/http.main-server";
import storeConfig from "../../../configs/store.config.json";

/* Function for get all users */
export const adminGetAllUser = (access_token) => async (dispatch) => {
    try {
        dispatch(adminSlice.actions.adminLoading());

        const response = await apiMainServer.post(
            AdminApi.get_all_users,
            null
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(adminSlice.actions.adminError(response.data.message));
            return;
        }

        console.log(response.data);
        dispatch(adminSlice.actions.getAllUserSuccess(response.data))
    } catch (e) {
        dispatch(adminSlice.actions.adminError(e.message));
    }
}

/* Function for create new company */
export const adminCreateCompany = (data) => async (dispatch) => {
    try {
        dispatch(adminSlice.actions.loading());

        // @(idea):
        // Имеет смысл здесь добавить последовательность запросов. Не всё одним запросом отправлять (файл + данные),
        // а разделять данные и файл, и после обработки данных отправлять уже файл в качестве мутирующего
        // элемента в последовательности всех запросов (с той целью, чтобы не нагружать сервер лишними загрузками)
        const formData = new FormData();
        formData.append("logo", data.logo);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("email_company", data.email_company);
        formData.append("email_admin", data.email_admin);
        formData.append("phone", data.phone);
        formData.append("link", data.link);

        const response = await apiMainServer.post(
            (MainApi.main_server + AdminApi.create_company),
            formData
        );

        if (response.status != 200 && response.status != 201) {
            dispatch(adminSlice.actions.error(response.data.message));
            return;
        }

        dispatch(adminSlice.actions.createCompanySuccess(response.data))
    } catch (e) {
        dispatch(adminSlice.actions.error(e.message));
    }
}
