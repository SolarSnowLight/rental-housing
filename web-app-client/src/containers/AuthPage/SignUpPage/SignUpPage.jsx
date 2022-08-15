import React, { useState } from "react";
import useHttp from '../../../hooks/http.hook';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { authSignIn } from '../../../store/actions/AuthAction';
import { authSlice } from '../../../store/reducers/AuthSlice';
import styles from './SignUpPage.module.css';

const SignUpPage = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();

    const { loading, request, error, clearError } = useHttp();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (event) => {
        setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
    };

    const signUpHandler = () => {
        dispatch(authSignIn(form));
    }

    return (
        <div>
            SignUpPage
        </div>
    )
}

export default SignUpPage;