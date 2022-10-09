/* Context */
import { projectSlice } from "../reducers/ProjectSlice";
import messageQueueAction from "./MessageQueueAction";

/**
 * Function for set item info about project
 * @param {string} item - key for property object
 * @param {any} value - value for property object
 * @returns {Promise<any>}
 */
const setItemProjectInfo = (item, value) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.setItemProjectInfo({ item, value }));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
};

/**
 * Add information object for current project
 * @param {any} object - object information
 * @returns 
 */
const addObjectInfo = (object) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.addObjectInfo(object));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
}

/**
 * Delete object info in project
 * @param {any} object 
 * @returns {Promise<any>}
 */
const deleteObjectInfo = (object) => async (dispatch) => {
    dispatch(projectSlice.actions.loadingStart());

    try {
        dispatch(projectSlice.actions.deleteObjectInfo(object));
    } catch (e) {
        dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(projectSlice.actions.loadingEnd());
}

/**
 * Clear project info
 * @returns {Promise<any>}
 */
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