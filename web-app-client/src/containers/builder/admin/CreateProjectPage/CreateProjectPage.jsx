/* Libraries */
import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

/* Context */
import projectAction from 'src/store/actions/ProjectAction';
import { authSlice } from 'src/store/reducers/AuthSlice';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Components */
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/ui/buttons/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ImageUpload from 'src/components/ImageUpload';

/* Hooks */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import useHttp from 'src/hooks/http.hook';

/* Constants */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import CompanyApi from 'src/constants/addresses/apis/company.api';
import AdminApi from 'src/constants/addresses/apis/admin.api';

/* Styles */
import styles from './CreateProjectPage.module.css';
import companyAction from 'src/store/actions/CompanyAction';

const CreateProjectPage = () => {
    // Section of working with the network over the HTTP protocol
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const projectSelector = useAppSelector((state) => state.projectReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();
    const message = useMessageToastify();

    // The data section presented on the page
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Data section of functional operation of components
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingAutocomplete = open && options?.length === 0;

    useEffect(() => {
        dispatch(messageQueueAction.addMessage(null, "error", error));
        clearError();
    }, [error, message, clearError]);

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        dispatch(projectAction.setItemProjectInfo("logo", imageList));
    };

    const changeHandler = (key, value) => {
        dispatch(projectAction.setItemProjectInfo(key, value));
    };

    const createProjectHandler = async () => {
        dispatch(companyAction.createProject(
            {
                title: projectSelector.title,
                description: projectSelector.description,
                managers: projectSelector.managers,
                uuid: userSelector.company?.uuid
            },
            projectSelector.logo[0].file
        ));
    };

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
        navigate(
            (BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_add_object),
            {
                state: {
                    title: projectSelector.title,
                    description: projectSelector.description,
                    logo: projectSelector.logo
                }
            }
        );
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
                            <ImageUpload
                                value={projectSelector.logo}
                                onChange={onChangeImage}
                            />
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