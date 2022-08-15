import { authSlice } from "../reducers/AuthSlice";
import MainApi from "../../constants/addresses/apis/main.api";
import AuthApi from "../../constants/addresses/apis/auth.api";

export const authSignIn = (data) => async(dispatch) => {
    try{
        dispatch(authSlice.actions.signIn());
        const response = await fetch(
            (MainApi.main_server + AuthApi.sign_in),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })
            }
        );

        const responseData = await response.json();

        if(!response.ok){
            dispatch(authSlice.actions.signInError(responseData.message))
        }

        dispatch(authSlice.actions.signInSuccess(responseData));
    }catch(e){
        dispatch(authSlice.actions.signInError(e.message));
    }
};