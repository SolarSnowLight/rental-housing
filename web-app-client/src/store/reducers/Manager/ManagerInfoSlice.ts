/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IManagerCompanyModel, IManagerProjectInfoModel } from "src/models/Manager/IManagerCompany";

/* Локальные интерфейсы */
interface ManagerInfoSlice {
    projects: IManagerProjectInfoModel[] | null | undefined,
    isLoading: boolean
}

/* Базовое состояние текущего слайса */
const initialState: ManagerInfoSlice = {
    projects: null,
    isLoading: false
};

/* Create a new clice for project API */
export const managerInfoSlice = createSlice({
    name: "manager_info_slice",
    initialState,
    reducers: {
        loadingStart(state: ManagerInfoSlice) {
            state.isLoading = true;
        },

        loadingEnd(state: ManagerInfoSlice) {
            state.isLoading = false;
        },

        clear(state: ManagerInfoSlice) {
            state.projects = null;
            state.isLoading = false;
        },

        setProjects(state: ManagerInfoSlice, action: PayloadAction<IManagerCompanyModel>) {
            state.isLoading = false;

            if (action.payload) {
                state.projects = action.payload.projects;
            }
        }
    },
});

export default managerInfoSlice.reducer;