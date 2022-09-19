import React, { useState, useEffect } from 'react';
import styles from './BuilderAdminPage.module.css';
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
import MainApi from 'src/constants/addresses/apis/main.api';
import userAction, { getUserCompany } from 'src/store/actions/UserAction';

const BuilderAdminPage = () => {
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    const authActions = authSlice.actions;
    const { loading, request, error, clearError } = useHttp();

    const message = useMessageToastify();

    useEffect(() => {
        if (authSelector.error.length > 0) {
            message(authSelector.error, "error");
            dispatch(authActions.authClearError());
        }
    }, [authSelector.error]);

    useEffect(() => {
        dispatch(userAction.getUserCompany());
    }, []);


    const [btnDisabled, setBtnDisabled] = useState(true);
    const [logo, setLogo] = useState(
        (userSelector.company?.data.logo) ?
            [
                {
                    data_url: `${MainApi.main_server}/${userSelector.company.data.logo}`
                }
            ]
            :
            []
    );
    const [form, setForm] = useState({
        title: userSelector.company?.data.title,
        description: userSelector.company?.data.description,
        email: userSelector.company?.data.email_company,
        phone: userSelector.company?.data.phone,
        link: userSelector.company?.data.link,
        admin: userSelector.company?.data.email_admin
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

            if (response?.users && active) {
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
                if (form[key]?.length > 0) {
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
                <span className={styles["admin-page__h2"]}>Изменение информации о компании</span>
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
                                        <span className='span__text__gray'>Добавить фото</span>
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
                            defaultValue={form.description}
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
                            defaultValue={form.title}
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
                            defaultValue={form.email}
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
                            defaultValue={form.phone}
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
                            defaultValue={form.link}
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
                        }}>Сохранить изменения</Button>
                </div>
            </div>
        </form>
    );
}

export default BuilderAdminPage;