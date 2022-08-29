import useHttp from '../../../hooks/http.hook';
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hook';
import { authSignIn } from '../../../store/actions/AuthAction';
import { authSlice } from '../../../store/reducers/AuthSlice';
import { TextField, Button, InputAdornment, IconButton, Box, Typography, LinearProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm, Controller, SubmitHandler, useFormState } from "react-hook-form";
import { emailValidation, passwordValidation } from './validation';
import { alpha, styled } from '@mui/material/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

import { root, textStyleDefault } from '../../../styles';
import styles from './SignUpPage.module.css';
import { Link } from 'react-router-dom';
import { borderRadius } from '@mui/system';
import { styleTextBlack, styleTextGray } from './styles';
import ImageUploading from "react-images-uploading";
import { useMessageToastify } from '../../../hooks/message.toastify.hook';

const LinearProgressWithLabel = (props) => {
    return (
        <Box sx={{ display: 'grid' }}>
            <Box sx={{ minWidth: 35, display: 'grid', justifyContent: 'center' }}>
                <Typography
                    variant="body2" color="text.secondary"
                    sx={{
                        ...styleTextBlack
                    }}
                >
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    {...props}
                    sx={{
                        height: "16px",
                        backgroundColor: root.colorWhite,
                        border: "1px solid #000000",
                        [`& .${linearProgressClasses.bar}`]: {
                            backgroundColor: root.colorGreen,
                        }
                    }}
                />
            </Box>
        </Box>
    );
}

const SignUpPage = ({ setStateCurrentPage }) => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const message = useMessageToastify();

    useEffect(() => {
        message(auth.message, "error");
    }, [auth]);

    const { loading, request, error, clearError } = useHttp();

    const [progress, setProgress] = useState(0);

    const [showIcon, setShowIcon] = useState({
        showPassword: false,
    });

    const [profileImage, setProfileImage] = useState([]);
    const [formData, setFormData] = useState({
        email: '', 
        password: '',
        name: '',
        surname: '',
        patronymic: '',
        nickname: '', 
    });

    useEffect(() => {
        if(profileImage.length > 0){
            setProgress(progress + 30);
        }else if(progress > 0) {
            setProgress(progress - 30);
        }
    }, [profileImage]);

    useEffect(() => {
        if(formData.name.length > 0){
            setProgress(progress + 20);
            return;
        }else if(progress > 0) {
            setProgress(progress - 20);
            return;
        }

        if(formData.surname.length > 0){
            setProgress(progress + 10);
            return;
        }else if(progress > 0) {
            setProgress(progress - 10);
            return;
        }

        if(formData.patronymic.length > 0){
            setProgress(progress + 10);
            return;
        }else if(progress > 0) {
            setProgress(progress - 10);
            return;
        }

        if(formData.nickname.length > 0){
            setProgress(progress + 10);
            return;
        }else if(progress > 0) {
            setProgress(progress - 10);
            return;
        }

        if(formData.email.length > 0){
            setProgress(progress + 10);
            return;
        }else if(progress > 0) {
            setProgress(progress - 10);
            return;
        }

        if(formData.password.length > 0){
            setProgress(progress + 10);
            return;
        }else if(progress > 0) {
            setProgress(progress - 10);
            return;
        }

    }, [formData]);

    const onChangeImage = (imageList, addUpdateIndex) => {
        setProfileImage(imageList);
    };

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
            <div className={styles["auth-block__content"]}>
                <div>
                    <span className={styles["auth-block-text__header"]} >Регистрация</span>
                </div>
                <div style={{ marginTop: '3em' }}>
                    <LinearProgressWithLabel
                        value={progress}
                    />
                </div>
                <div className={styles["auth-block-img__header"]}>
                    {
                        /*
                        <Button
                        variant="contained"
                        component="label"
                        sx={{
                            border: "1px dashed #000000",
                            backgroundColor: "transparent",
                            width: "9em",
                            height: "9em",
                            ...styleTextGray,

                            ":hover": {
                                border: "1px dashed #000000",
                                backgroundColor: "transparent",
                                width: "9em",
                                height: "9em",
                                ...styleTextGray,
                            }
                        }}
                    >
                        Добавить фото
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                        */
                    }


                    <ImageUploading
                        value={profileImage}
                        onChange={onChangeImage}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            <div>
                                <button
                                    className={styles["upload_image_wrapper"]}
                                    style={{
                                        display: profileImage.length > 0 ? "none" : "block",
                                    }}

                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Добавить фото
                                </button>
                                {imageList.map((image, index) => {
                                    return (
                                        <div key={index} className={styles["auth-img-delete"]}>
                                        <img
                                            src={image.data_url}
                                            alt=""
                                            width="9em"
                                            height="9em"
                                            className={styles["upload_image"]}
                                        />
                                        <Button
                                            onClick={() => {
                                                onImageRemove(index);
                                            }}
                                            sx={{
                                                marginTop: '1em',
                                                backgroundColor: root.colorGreen,
                                                fontSize: '14px !important',
                                                borderRadius: '0px !important',
                                                border: '1px solid #424041 !important',
                                                width: '100%',
                                                height: '2em',
                                                ...textStyleDefault,
                                                ":hover": {
                                                    backgroundColor: root.colorGreen,
                                                    fontSize: '14px !important',
                                                    borderRadius: '0px !important',
                                                    border: '1px solid #424041 !important',
                                                    width: '100%',
                                                    height: '2em',
                                                    ...textStyleDefault,
                                                }
                                            }}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                    )
                                })}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div>
                    <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles["auth-form-input__form"]}>
                            <Controller
                                control={control}
                                name="name"
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Имя"
                                        placeholder="Введите имя"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setFormData({
                                                ...formData,
                                                name: e.target.value
                                            });
                                        }}
                                        value={field.value}
                                        error={!!errors.name?.message}
                                        helperText={errors.name?.message}
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
                        <div className={styles["auth-form-input__form"]}>
                            <Controller
                                control={control}
                                name="surname"
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Фамилия"
                                        placeholder="Введите фамилию"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        error={!!errors.name?.message}
                                        helperText={errors.name?.message}
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
                        <div className={styles["auth-form-input__form"]}>
                            <Controller
                                control={control}
                                name="patronimyc"
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <TextField
                                        id="outlined-required"
                                        label="Отчество"
                                        placeholder="Введите фамилию"
                                        onChange={(e) => field.onChange(e)}
                                        value={field.value}
                                        error={!!errors.patronimyc?.message}
                                        helperText={errors.patronimyc?.message}
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
                                Продолжить регистрацию
                            </Button>
                        </div>
                    </form>
                </div>
                <div className={styles["auth-form-register__form"]}>
                    <div>
                        <span className={styles["auth-form-text-gray__form"]} >Есть аккаунт?</span>
                        <span
                            className={styles["auth-form-text-black__form"]}
                            onClick={() => {
                                setStateCurrentPage({
                                    "value": "sign-in"
                                });
                            }}
                        > Авторизоваться</span>
                    </div>
                </div>
                <div className={styles["auth-form-register__form"]}></div>
            </div>
        </div>
    );
}

export default SignUpPage;