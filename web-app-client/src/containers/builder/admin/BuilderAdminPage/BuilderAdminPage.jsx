/* Libraries */
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField } from '@mui/material';
import { useFormState } from 'react-hook-form';
import ImageUploading from "react-images-uploading";
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

/* Context */
import userAction from 'src/store/actions/UserAction';
import { authSlice } from 'src/store/reducers/AuthSlice';

/* Components */
import ImageUpload from 'src/components/ImageUpload';
import CircularIndeterminate from 'src/components/CircularIndeterminate';

/* Hooks */
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { useAppSelector } from 'src/hooks/redux.hook';
import { useAppDispatch } from 'src/hooks/redux.hook';
import useHttp from 'src/hooks/http.hook';

/* Dtos */
import CompanyUpdateDto from 'src/dtos/company.update-dto';

/* Constants */
import AdminApi from 'src/constants/addresses/apis/admin.api';
import MainApi from 'src/constants/addresses/apis/main.api';

/* Styles */
import styles from './BuilderAdminPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles/index';
import { MuiTelInput } from 'mui-tel-input';
import { emailValidation, linkValidation } from './validation';

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
        dispatch(userAction.getUserCompany(authSelector.access_token));
    }, []);


    const [btnDisabled, setBtnDisabled] = useState(true);

    const onChangeImage = (imageList) => {
        if (imageList.length > 0) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }

        dispatch(userAction.setItemCompanyInfo("logo", imageList));
    };

    const changeHandler = (key, value) => {
        setBtnDisabled(false);
        dispatch(userAction.setItemCompanyInfo(key, value));
    };

    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    const onSubmit = (data) => {
        if (userSelector.company.data.logo.length <= 0) {
            message("Необходимо добавить логотип компании!", "error");
            return;
        }

        dispatch(userAction.companyInfoUpdate(
            authSelector.access_token,
            {
                ...new CompanyUpdateDto({
                    uuid: userSelector.company.uuid,
                    ...userSelector.company.data
                })
            },
            (userSelector.company.data.logo[0].file) ? userSelector.company.data.logo[0].file : null
        ));

        setBtnDisabled(true);
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

    return (
        <form className={styles["admin-page__container"]} onSubmit={handleSubmit(onSubmit)}>
            {
                (authSelector.isLoading || userSelector.isLoading) && <CircularIndeterminate />
            }
            <div className={styles["admin-page__container--row"]}>
                <span className={styles["admin-page__h2"]}>Изменение информации о компании</span>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div className={styles["admin-page__container--column"]}>
                    <ImageUpload
                        title={"Логотип *"}
                        value={userSelector.company?.data.logo}
                        onChange={onChangeImage}
                    />
                </div>
                <div className={styles["admin-page__container--column"]}>
                    <div>
                        <span className={styles['admin-page__h4']}>Описание</span>
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="description"
                            defaultValue={userSelector.company?.data.description}
                            render={({ field }) => (
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={9}
                                    placeholder="Описание"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("description", e.target.value);
                                    }}
                                    defaultValue={userSelector.company?.data.description}
                                    error={!!errors.description?.message}
                                    helperText={errors.description?.message}
                                    sx={{
                                        width: '20em',
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
                            )}
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
                            defaultValue={userSelector.company?.data.title}
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
                            name="email_company"
                            defaultValue={userSelector.company?.data.email_company}
                            rules={emailValidation}
                            render={({ field }) => (
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Введите email"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("email_company", e.target.value);
                                    }}
                                    value={field.value}
                                    error={!!errors.email_company?.message}
                                    helperText={errors.email_company?.message}
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
                            defaultValue={userSelector.company?.data.phone}
                            render={({ field }) => (
                                <MuiTelInput
                                    required
                                    value={field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        changeHandler("phone", e);
                                    }}
                                    error={!!errors.phone?.message}
                                    helperText={errors.phone?.message}
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
                            defaultValue={userSelector.company?.data.link}
                            rules={linkValidation}
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
                            name="email_admin"
                            render={({ field }) => (
                                <Autocomplete
                                    readOnly
                                    id="tags-outlined"
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    defaultValue={{ "email": userSelector.company?.data.email_admin }}
                                    getOptionLabel={(option) => option.email}
                                    isOptionEqualToValue={(option, value) => option.email === value.email}
                                    options={options}
                                    loading={loadingAutocomplete}
                                    onChange={(e, value) => {
                                        field.value = value.email;
                                        changeHandler("email_admin", value.email);
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