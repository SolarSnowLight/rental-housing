import { projectSlice } from "../reducers/ProjectSlice";

const setItemProjectInfo = (item, value) => async (dispatch) => {
    try {
        dispatch(projectSlice.actions.loading());
        dispatch(projectSlice.actions.setItemProjectInfo({ item, value }));
    } catch (e) {
        dispatch(projectSlice.actions.clear());
        dispatch(projectSlice.actions.error(e.message));
    }
};

const addObjectInfo = (object) => async (dispatch) => {
    try {
        dispatch(projectSlice.actions.loading());
        dispatch(projectSlice.actions.addObjectInfo(object));
    } catch (e) {
        dispatch(projectSlice.actions.clear());
        dispatch(projectSlice.actions.error(e.message));
    }
}

const deleteObjectInfo = (object) => async (dispatch) => {
    try {
        dispatch(projectSlice.actions.loading());
        dispatch(projectSlice.actions.deleteObjectInfo(object));
    } catch (e) {
        dispatch(projectSlice.actions.clear());
        dispatch(projectSlice.actions.error(e.message));
    }
}

const clearProjectInfo = () => async (dispatch) => {
    dispatch(projectSlice.actions.clear());
}

const projectAction = {
    setItemProjectInfo,
    addObjectInfo,
    deleteObjectInfo,
    clearProjectInfo
};

export default projectAction;