import useHttp from '../../../hooks/http.hook';
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { authSignIn } from '../../../store/actions/AuthAction';
import { authSlice } from '../../../store/reducers/AuthSlice';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller, SubmitHandler, useFormState } from "react-hook-form";
import { emailValidation, passwordValidation } from './validation';
import { alpha, styled } from '@mui/material/styles';

import { root, textStyleDefault } from '../../../styles';
import styles from './SignInPage.module.css';
import { Link } from 'react-router-dom';
import { borderRadius } from '@mui/system';
import { useMessageToastify } from '../../../hooks/message.toastify.hook';
import CircularIndeterminate from '../../../components/CircularIndeterminate';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderRadius: '0px'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },
});

const SignInPage = ({ setStateCurrentPage }) => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    dispatch(authActions.authClearError());

    const message = useMessageToastify();

    useEffect(() => {
        if (auth.error.length > 0) {
            message(auth.error, "error");
            dispatch(authActions.authClearError());
        }
    }, [auth.error]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            message("Успешная авторизация", "success");
        }
    }, [auth.code]);

    const { loading, request, error, clearError } = useHttp();

    const [showIcon, setShowIcon] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setShowIcon({
            showPassword: !showIcon.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // For form
    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        dispatch(authSignIn(data));
    };

    return (
        <div className={styles["auth-block__main"]}>
            {
                auth.isLoading && <CircularIndeterminate />
            }

            <div className={styles["auth-block__content"]}>
                <div>
                    <span className={styles["auth-block-text__header"]} >Вход</span>
                </div>
                <div>
                    <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles["auth-form-input__form"]} style={{ marginTop: '5em' }}>
                            <Controller
                                control={control}
                                name="email"
                                rules={emailValidation}
                                defaultValue={''}
                                render={({ field }) => (
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Email"
                                        placeholder="Введите email адрес"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        error={!!errors.email?.message}
                                        helperText={errors.email?.message}
                                        sx={{
                                            borderRadius: '0px !important',
                                            border: 'none',
                                            width: '100%',
                                            '&:hover fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                            'fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles["auth-form-input__form"]} style={{ marginTop: '2em' }}>
                            <Controller
                                control={control}
                                name="password"
                                rules={passwordValidation}
                                defaultValue={''}
                                render={({ field }) => (
                                    <TextField
                                        required
                                        label="Пароль"
                                        variant="outlined"
                                        type={showIcon.showPassword ? "text" : "password"}
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        error={!!errors.password?.message}
                                        helperText={errors.password?.message}
                                        sx={{
                                            borderRadius: '0px !important',
                                            border: 'none',
                                            width: '100%',
                                            '&:hover fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                            'fieldset': {
                                                border: '1px solid #424041 !important',
                                                borderRadius: '0px'
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showIcon.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles["auth-form-recover__form"]}>
                            <Link to={"/"} className={styles["auth-form-recover-link__form"]}>Восстановить пароль</Link>
                        </div>
                        <div className={styles["auth-form-btn__form"]}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth={true}
                                disableElevation={true}
                                sx={{
                                    backgroundColor: root.colorGreen,
                                    fontSize: '14px !important',
                                    borderRadius: '0px !important',
                                    border: '1px solid #424041 !important',
                                    width: '100%',
                                    height: '3em',
                                    ...textStyleDefault,
                                    ":hover": {
                                        backgroundColor: root.colorGreen,
                                        fontSize: '14px !important',
                                        borderRadius: '0px !important',
                                        border: '1px solid #424041 !important',
                                        width: '100%',
                                        height: '3em',
                                        ...textStyleDefault,
                                    }
                                }}
                            >
                                Войти
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={styles["auth-form-register__form"]}>
                    <div>
                        <span className={styles["auth-form-text-gray__form"]} >Ещё нет аккаунта?</span>
                        <span
                            className={styles["auth-form-text-black__form"]}
                            onClick={() => {
                                setStateCurrentPage({
                                    "value": "sign-up"
                                });
                            }}
                        > Зарегистрироваться</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;