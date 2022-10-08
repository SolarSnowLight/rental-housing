import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    projects: [],
    managers: [],
    isLoading: false,
};

/* Create a new clice for company API */
export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        loadingStart(state) {
            state.isLoading = true;
        },

        loadingEnd(state) {
            state.isLoading = false;
        },

        clear(state){
            state.projects = [];
            state.managers = [];
            state.isLoading = false;
        },

        // Get all projects
        getAllProjectsSuccess(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state.projects = action.payload.projects;
            }
        },

        getAllProjectsAddSuccess(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state.projects = state.projects.concat(action.payload.projects);
            }
        },

        // Get all managers
        getAllManagersSuccess(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state.managers = action.payload.managers;
            }
        },

        getAllManagersAddSuccess(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state.managers = state.managers.concat(action.payload.managers);
            }
        }
    },
});

export default companySlice.reducer;