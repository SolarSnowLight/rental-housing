/* Libraries */
import { createSlice } from "@reduxjs/toolkit";

/* Base state for current slice */
const initialState = {
    logo: [],
    title: '',
    description: '',
    managers: [],
    objects: [],
    isLoading: false
};

/* Create a new clice for project API */
export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        loadingStart(state) {
            state.isLoading = true;
        },

        loadingEnd(state) {
            state.isLoading = false;
        },

        clear(state) {
            state.logo = [];
            state.title = '';
            state.description = '';
            state.managers = [];
            state.objects = [];
            state.isLoading = false;
        },

        setItemProjectInfo(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state[action.payload.item] = action.payload.value;
            }
        },

        addObjectInfo(state, action) {
            state.isLoading = false;

            if (action.payload) {
                state.objects = state.objects.concat(action.payload.objects);
            }
        },

        deleteObjectInfo(state, action) {
            state.isLoading = false;

            const index = state.objects.indexOf(action.payload);

            if (index >= 0) {
                state.objects.splice(index, 1);
            }
        }
    },
});

export default projectSlice.reducer;