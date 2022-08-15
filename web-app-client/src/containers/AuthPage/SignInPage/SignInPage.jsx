import useHttp from '../../../hooks/http.hook';
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { authSignIn } from '../../../store/actions/AuthAction';
import { authSlice } from '../../../store/reducers/AuthSlice';

import styles from './SignInPage.module.css';

const SignInPage = () => {
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
        <div className={styles["container-login"]}>
            <div className={styles["content"]}>
                <div className={styles["item-login-1"]}>
                    <img className={styles["auth-logo-img"]} />
                    <span className={styles["auth-logo-text"]}>NetMan AR Game</span>
                </div>

                <div className={styles["item-login-2"]}>
                    <span className={styles["auth-txt"]}>Авторизация</span>

                    <div className={styles["btn-mail-pswrd"]}>
                        Email
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Введите email"
                            className={styles["login-input-field"]}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles["btn-mail-pswrd"]}>
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Введите пароль"
                            className={styles["login-input-field"]}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className={styles["restore-password"]}>
                        <a className={styles["restore-ref"]} href="">
                            Забыл пароль
                        </a>
                    </div>

                    <button
                        className={styles["btn-auth-std"]}
                        onClick={signUpHandler}
                        disabled={loading}
                    >
                        <span>Войти</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;