import { authSlice } from "../reducers/AuthSlice";

import MainApi from "../../constants/addresses/apis/main.api";
import AuthApi from "../../constants/addresses/apis/auth.api";
import axios from "axios";

/* Function for auth user on high level */
export const authSignIn = (data) => async (dispatch) => {
    try {
        // Call action for set state about begin request
        dispatch(authSlice.actions.authLoading());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.sign_in),
            JSON.stringify({
                ...data
            }),
            {
                withCredentials: true
            }
        );

        // Handling error
        if ((response.status != 200) && (response.status != 201)) {
            dispatch(authSlice.actions.authError(response.data.message));
            return;
        }

        // Call action for set state about success request (her ending)
        dispatch(authSlice.actions.signInSuccess(response.data));
    } catch (e) {
        dispatch(authSlice.actions.authError(e.response.data.message));
    }
};

/* Function for register new user */
export const authSignUp = (data, profileImage) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.authLoading());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.sign_up),
            JSON.stringify({
                ...data
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        );

        // Error handling
        if ((response.status != 200) && (response.status != 201)) {
            dispatch(authSlice.actions.authError(response.data.message));
            return;
        }

        // Upload user's image for profile
        if (profileImage) {
            const formData = new FormData();
            formData.append("file", profileImage);

            await axios.post(
                (MainApi.main_server + AuthApi.upload_profile_image),
                formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + response.data.access_token
                    }
                }
            );
        }

        dispatch(authSlice.actions.signUpSuccess(response.data));
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
};

/* Function for update data user from local storage */
export const authUpdate = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.getAuthData());
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
};

/* Function for logout user */
export const authLogout = (access_token) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.authLoading());

        const response = await axios.post(
            (MainApi.main_server + AuthApi.logout),
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                },
                withCredentials: true
            }
        );

        // Error handling
        if (response.status != 200 && response.status != 201) {
            dispatch(authSlice.actions.authError(response.data.message));
        }

    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
    
    dispatch(authSlice.actions.logout());
}

/* Function for set new data auth */
export const setAuthData = (accessToken) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.setAuthData(accessToken));
    } catch (e) {
        dispatch(authSlice.actions.authError(e.message));
    }
};
