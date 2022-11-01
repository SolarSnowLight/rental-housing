/* Контекст */
import { managerInfoSlice } from "src/store/reducers/Manager/ManagerInfoSlice";

/* HTTP */
import apiMainServer from "src/http/http.main-server";

/* Константы */
import MainApi from "src/constants/addresses/apis/main.api";
import AdminApi from "src/constants/addresses/apis/admin.api";
import messageQueueAction from "../MessageQueueAction";
import {
  IManagerCompanyModel,
  IManagerUuidModel,
} from "src/models/Manager/IManagerCompany";

/**
 * Получение списка проектов, за которыми закреплён текущий менеджер
 * @returns {Promise<void>}
 */
const getProjects = (value: IManagerUuidModel) => async (dispatch) => {
  dispatch(managerInfoSlice.actions.loadingStart());

  try {
    const response = await apiMainServer.post<IManagerCompanyModel>(
      AdminApi.get_all_users,
      JSON.stringify({
        value,
      })
    );

    if (response.status != 200 && response.status != 201) {
      dispatch(messageQueueAction.addMessage(response.data.message, "error"));
      return;
    }

    if (response.data.projects) {
      dispatch(managerInfoSlice.actions.setProjects(response.data));
    }
  } catch (e) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(managerInfoSlice.actions.loadingEnd());
};

const managerInfoAction = {
  getProjects,
};

export default managerInfoAction;
