/* Context */
import { projectSlice } from "../reducers/ProjectSlice";
import messageQueueAction from "./MessageQueueAction";

const setItemProjectInfo = (item, value) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.setItemProjectInfo({ item, value }));
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
};

const addObjectInfo = (object) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.addObjectInfo(object));
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
}

const deleteObjectInfo = (object) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.deleteObjectInfo(object));
    } catch (e) {
        dispatch(messageQueueAction.ErrorHandling(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
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