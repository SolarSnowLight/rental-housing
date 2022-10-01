import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';

import styles from './CreateProjectPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles';
import ImageUploading from "react-images-uploading";
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { authSlice } from 'src/store/reducers/AuthSlice';
import useHttp from 'src/hooks/http.hook';
import CircularProgress from '@mui/material/CircularProgress';
import AdminApi from 'src/constants/addresses/apis/admin.api';
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/ui/buttons/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import { useNavigate } from 'react-router-dom';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import CompanyApi from 'src/constants/addresses/apis/company.api.';
import projectAction from 'src/store/actions/ProjectAction';

const CreateProjectPage = () => {
    // Section of working with the network over the HTTP protocol
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const projectSelector = useAppSelector((state) => state.projectReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();

    const message = useMessageToastify();

    useEffect(() => {
        message(error, "error");
        clearError();
    }, [error, message, clearError]);

    // The data section presented on the page
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        dispatch(projectAction.setItemProjectInfo("logo", imageList));
    };

    const changeHandler = (key, value) => {
        dispatch(projectAction.setItemProjectInfo(key, value));
    };

    const createProjectHandler = async () => {
        const response = await request(CompanyApi.create_project, 'POST', JSON.stringify({
            title: projectSelector.title,
            description: projectSelector.desctiprion,
            manager: projectSelector.managers,
            uuid: userSelector.company?.uuid
        }));

        if (response.message) {
            message(response.message, "error");
            return;
        }

        const formData = new FormData();
        formData.append('logo', projectSelector.logo[0].file);
        formData.append('uuid', response.uuid);

        const responseImage = await request(CompanyApi.project_add_logo, 'POST', formData, {}, true);
        if (response.message) {
            message(response.message, "error");
            return;
        }

        message("Проект создан успешно!", "success");
    };

    // Data section of functional operation of components
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingAutocomplete = open && options?.length === 0;

    useEffect(() => {
        let active = true;

        if (!loadingAutocomplete) {
            return undefined;
        }

        (async () => {
            const response = await request(AdminApi.get_all_users, 'POST');

            if (active && response.users) {
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

    // Navigation functions section
    const navigate = useNavigate();
    const toCreateObject = () => {
        window.scrollTo(0, 0);
        navigate(BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_add_object);
    }

    return (
        <div className={styles["wrapper-section"]}>
            <div className={styles["wrapper-section__item"]}>
                <div>
                    <span className='span__text__black-h3'>Создание проекта</span>
                </div>
                <div className={styles["wrapper-section__item-element__column"]}>
                    <div>
                        <div className={styles["wrapper-section__item-element"]}>
                            <div>
                                <span className='span__text__gray'>Лого *</span>
                            </div>
                            <div>
                                <ImageUploading
                                    value={projectSelector.logo}
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
                                                    display: projectSelector.logo.length > 0 ? "none" : "block",
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
                                                                width: '60%',
                                                                height: '2em',
                                                                ...textStyleDefault,
                                                                ":hover": {
                                                                    backgroundColor: root.colorGreen,
                                                                    fontSize: '14px !important',
                                                                    borderRadius: '0px !important',
                                                                    border: '1px solid #424041 !important',
                                                                    width: '60%',
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
                        <div className={styles["wrapper-section__item-element"]}>
                            <div>
                                <span className='span__text__gray'>Название *</span>
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    placeholder="Название проекта"
                                    defaultValue={projectSelector.title}
                                    onChange={(e) => {
                                        changeHandler("title", e.target.value);
                                    }}
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
                            </div>
                        </div>
                        <div className={styles["wrapper-section__item-element"]}>
                            <div>
                                <span className='span__text__gray'>Менеджеры проекта</span>
                            </div>
                            <div>
                                <Autocomplete
                                    id="tags-outlined"
                                    multiple
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
                                    defaultValue={projectSelector.managers}
                                    onChange={(e, value) => {
                                        changeHandler("managers", value);
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
                            </div>
                        </div>
                    </div>
                    <div className={styles["wrapper-section__element-description"]}>
                        <div>
                            <span className='span__text__gray'>Описание</span>
                        </div>
                        <div className={styles["wrapper-section__element-description-input"]}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={9}
                                name={"description"}
                                placeholder="Описание"
                                defaultValue={projectSelector.description}
                                onChange={(e) => {
                                    changeHandler("description", e.target.value);
                                }}

                                sx={{
                                    width: '100%',
                                    height: '100%',
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
            </div>
            <div className={styles["wrapper-section__item__map"]}>
                <div className={styles["wrapper-section__item__map-element"]}>
                    <div className={styles["grid-item__left"]}>
                        <span className='span__text__black-h4'>Объекты проекта на карте</span>
                    </div>
                    <div className={styles["grid-item__right"]}>
                        <ButtonWhiteComponent clickHandler={toCreateObject} title="Добавить объект" />
                    </div>
                </div>
                <div className={styles["wrapper-section__item-element__map"]}>
                    <MapComponent />
                </div>
            </div>
            <div className={styles["wrapper-section__item__map"]}>
                <div className={styles["wrapper-section__item__map-element"]}>
                    <div className={styles["grid-item__left"]}></div>
                    <div className={styles["grid-item__right"]}>
                        <ButtonGreenComponent
                            title="Создать проект"
                            clickHandler={createProjectHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectPage;