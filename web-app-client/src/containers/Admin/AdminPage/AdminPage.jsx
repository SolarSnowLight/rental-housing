import React, { useState, useEffect } from 'react';
import styles from './AdminPage.module.css';
import { textStyleDefault } from '../../../styles';
import { Button, TextField } from '@mui/material';
import { root } from '../../../styles';
import ImageUploading from "react-images-uploading";
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useMessageToastify } from '../../../hooks/message.toastify.hook';
import { useAppSelector } from '../../../hooks/redux.hook';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { authSlice } from '../../../store/reducers/AuthSlice';
import { useFormState } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../../../hooks/http.hook';
import AdminApi from '../../../constants/addresses/apis/admin.api';
import { styleTextGray } from './styles';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const AdminPage = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();

    const message = useMessageToastify();

    useEffect(() => {
        if (auth.error.length > 0) {
            message(auth.error, "error");
            dispatch(authActions.authClearError());
        }
    }, [auth.error]);


    const [btnDisabled, setBtnDisabled] = useState(true);
    const [logo, setLogo] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '',
        email: '', phone: '',
        link: '', admin: ''
    });

    const onChangeImage = (imageList, addUpdateIndex) => {
        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        console.log(form);
        // dispatch(authSignIn(data));
    };

    // Autocomplete settings
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingAutocomplete = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loadingAutocomplete) {
            return undefined;
        }

        (async () => {
            const response = await request(AdminApi.get_all_users, 'POST');

            if (active) {
                setOptions(response.users);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingAutocomplete]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (btnDisabled) {
            let countExists = 0;

            for (var key of Object.keys(form)) {
                if (form[key].length > 0) {
                    countExists++;
                }
            }

            if (countExists >= 1) {
                setBtnDisabled(false);
            }
        }
    }, [form]);

    return (
        <form className={styles["admin-page__container"]} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["admin-page__container--row"]}>
                <span className={styles["admin-page__h2"]}>Создание застройщика</span>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div className={styles["admin-page__container--column"]}>
                    <div>
                        <span className={styles['admin-page__h4']}>Логотип *</span>
                    </div>
                    <div>
                        <ImageUploading
                            value={logo}
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
                                            display: logo.length > 0 ? "none" : "block",
                                        }}

                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Добавить фото
                                    </button>
                                    {imageList.map((image, index) => {
                                        return (
                                            <div key={index} className={styles["btn-img-delete"]}>
                                                <img
                                                    src={image.data_url}
                                                    alt=""
                                                    width="11em"
                                                    height="11em"
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
                </div>
                <div className={styles["admin-page__container--column"]}>
                    <div>
                        <span className={styles['admin-page__h4']}>Описание</span>
                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={9}
                            name={"description"}
                            placeholder="Описание"
                            onChange={(e) => {
                                changeHandler("description", e.target.value);
                            }}

                            sx={{
                                width: '15em',
                                border: '1px solid #424041 !important',
                                borderRadius: '0px',
                                ':hover': {
                                    border: '1px solid #424041 !important',
                                    borderRadius: '0px'
                                },
                                '&:hover fieldset': {
                                    border: '0px !important',
                                    borderRadius: '0px'
                                },
                                'fieldset': {
                                    border: '0px !important',
                                    borderRadius: '0px'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div>
                    <div>
                        <span className={styles['admin-page__h4']}>Название *</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="title"
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Введите название компании"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("title", e.target.value);
                                    }}
                                    value={field.value}
                                    error={!!errors.title?.message}
                                    helperText={errors.title?.message}
                                    sx={{
                                        borderRadius: '0px !important',
                                        border: 'none',
                                        width: '20em',
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
                </div>
                <div>
                    <div>
                        <span className={styles['admin-page__h4']}>Email *</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Введите email"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("email", e.target.value);
                                    }}
                                    value={field.value}
                                    error={!!errors.email?.message}
                                    helperText={errors.email?.message}
                                    sx={{
                                        borderRadius: '0px !important',
                                        border: 'none',
                                        width: '20em',
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
                </div>
                <div>
                    <div>
                        <span className={styles['admin-page__h4']}>Номер телефона *</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="phone"
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="+7 XXX XXX XX XX"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("phone", e.target.value);
                                    }}
                                    value={field.value}
                                    error={!!errors.email?.message}
                                    helperText={errors.email?.message}
                                    sx={{
                                        borderRadius: '0px !important',
                                        border: 'none',
                                        width: '20em',
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
                </div>
                <div>
                    <div>
                        <span className={styles['admin-page__h4']}>Ссылка на сайт *</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="link"
                            defaultValue={''}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Введите ссылку"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("link", e.target.value);
                                    }}
                                    value={field.value}
                                    error={!!errors.link?.message}
                                    helperText={errors.link?.message}
                                    sx={{
                                        borderRadius: '0px !important',
                                        border: 'none',
                                        width: '20em',
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
                </div>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div>
                    <div>
                        <span className={styles['admin-page__h4']}>Администратор компании</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="admin"
                            defaultValue={''}
                            render={({ field }) => (
                                <Autocomplete
                                    id="tags-outlined"
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    getOptionLabel={(option) => option.email}
                                    isOptionEqualToValue={(option, value) => option.email === value.email}
                                    options={options}
                                    loading={loadingAutocomplete}
                                    onChange={(e, value) => {
                                        field.value = value.email;
                                        changeHandler("admin", value.email);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{
                                                borderRadius: '0px !important',
                                                border: 'none',
                                                width: '20em',
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
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div className={styles["admin-page__container--row-btn"]}>
                    <Button
                        type='submit'
                        variant="contained"
                        disabled={btnDisabled}
                        sx={{
                            backgroundColor: root.colorGreen,
                            fontSize: '14px !important',
                            borderRadius: '0px !important',
                            border: '1px solid #424041 !important',
                            width: '23em',
                            height: '4em',
                            ...textStyleDefault,
                            ":hover": {
                                backgroundColor: root.colorGreen,
                                fontSize: '14px !important',
                                borderRadius: '0px !important',
                                border: '1px solid #424041 !important',
                                width: '23em',
                                height: '4em',
                                ...textStyleDefault,
                            }
                        }}>Создать проект</Button>
                </div>
            </div>
        </form>
    );
}

export default AdminPage;