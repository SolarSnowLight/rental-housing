import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    projects: null,
    isLoading: false,
    error: ""
};

/* Create a new clice for company API */
export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        loading(state) {
            state.isLoading = true;
        },

        error(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearError(state) {
            state.error = "";
        },

        clear(state){
            state.projects = null;
            state.isLoading = false;
            state.error = "";
        },
        clearData(state) {
            state.projects = null;
            state.isLoading = false;
            state.error = "";
        },

        getAllProjectsSuccess(state, action) {
            state.isLoading = false;
            state.error = "";

            if (action.payload) {
                state.projects = action.payload.projects;
            }
        }
    },
});

export default companySlice.reducer;