/* Libraries */
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useFormState, useForm } from 'react-hook-form';

/* Context */
import projectAction from 'src/store/actions/ProjectAction';
import { authSlice } from 'src/store/reducers/AuthSlice';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Components */
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ImageUpload from 'src/components/UI/ImageUpload';
import TextFieldControl from 'src/components/UI/TextField/TextFieldControl';
import ObjectCard from 'src/components/ProjectInfo/ObjectCard';
import Space from 'src/components/Space';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar/HorizontalScrollbar';

/* Hooks */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import useHttp from 'src/hooks/http.hook';

/* Utils */
import { dataURItoBlob, isDataURL } from 'src/utils/file';

/* Constants */
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import CompanyApi from 'src/constants/addresses/apis/company.api';
import AdminApi from 'src/constants/addresses/apis/admin.api';

/* Styles */
import css from './CreateProjectPage.css';
import styles from './CreateProjectPage.module.css';
import companyAction from 'src/store/actions/CompanyAction';


import buildingExample1 from 'src/resources/images/examples/building-example-1.webp';
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp';
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg';
import homePage from 'src/resources/images/home_page.jpg';
import imagePlaceholder from 'src/resources/images/image-placeholder.png'
import mainPageBgc from 'src/resources/images/main-page-bgc.jpg'
import neonSunrise from 'src/resources/images/examples/neon-sunrise-web.jpg'
import retrowave1 from 'src/resources/images/examples/retrowave-1.png';
import hotlineMiami2 from 'src/resources/images/examples/wallpaper-Hotline-Miami-2---Wrong-Number2560x1440.jpg';
import needMoreAcidMarkII from 'src/resources/images/examples/need_more_acid_mark_ii.jpg';
import retrowave2 from 'src/resources/images/examples/Retrowave_(2).jpg';
import logoDefault from 'src/resources/images/company-logo-default.png'
import { useScrollbar } from 'src/hooks/useScrollbar/useScrollbar';


const objects = [...Array(6).keys()].map(i => ({
    id: i + '',
    builderLogo: logoDefault,
    images: [buildingExample1, buildingExample2, buildingExample3],
    objectName: 'Название объекта',
    year: 2025,
    objectCnt: i + 1,
}))
objects[0].images = [buildingExample1, buildingExample2, buildingExample3, homePage, imagePlaceholder, mainPageBgc, neonSunrise, retrowave1, hotlineMiami2, needMoreAcidMarkII, retrowave2]

const CreateProjectPage = () => {
    // Section of working with the network over the HTTP protocol
    const authSelector = useAppSelector((state) => state.authReducer);
    const userSelector = useAppSelector((state) => state.userReducer);
    const projectSelector = useAppSelector((state) => state.projectReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();
    const message = useMessageToastify();
    const objectsContainerRef = useRef(null);
    const objectsContentRef = useRef(null);
    const [scrollProps, onContainerScroll, setContainerScroll] = useScrollbar(objectsContainerRef, objectsContentRef);

    // The data section presented on the page
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Data section of functional operation of components
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loadingAutocomplete = open && options?.length === 0;

    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

    useEffect(() => {
        dispatch(messageQueueAction.addMessage(null, "error", error));
        clearError();
    }, [error, message, clearError]);

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        if (imageList.length > 0) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }

        const file = imageList.map((item) => {
            return {
                data_url: item.data_url
            }
        });


        dispatch(projectAction.setItemProjectInfo("logo", file));
    };

    const changeHandler = (key, value) => {
        dispatch(projectAction.setItemProjectInfo(key, value));
    };

    const onSubmit = () => {
        if (projectSelector.logo.length <= 0) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо добавить логотип проекта!"));
            return;
        }

        let file = projectSelector.logo[0];

        if ((file)
            && (Object.keys(file).length >= 1)
            && (Object.getPrototypeOf(file) === Object.prototype)
            && (!isDataURL(file.data_url))) {
            file = dataURItoBlob(projectSelector.logo[0].data_url);
        } else {
            file = null;
        }

        dispatch(companyAction.createProject(
            {
                title: projectSelector.title,
                description: projectSelector.description,
                managers: projectSelector.managers,
                uuid: userSelector.company?.uuid
            },
            file
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
        <form className={styles["wrapper-section"]} onSubmit={handleSubmit(onSubmit)}>
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
                            <TextFieldControl
                                title={"Название *"}
                                required={true}
                                control={control}
                                errors={errors}
                                name={"title"}
                                defaultValue={projectSelector.title}
                                placeholder={"Введите название компании"}
                                changeHandler={changeHandler}
                            />
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
                <div ref={objectsContainerRef} className={css.objectsListSlide} onScroll={onContainerScroll}>
                    <div ref={objectsContentRef} className={css.contentContainer}
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gap: '18px'
                        }}
                    >
                        {objects.map(it => <ObjectCard key={it.id} object={it} />)}
                    </div>
                </div>
                <Space h={8} />
                <div className={css.scrollbarContainer}>
                    <HorizontalScrollbar className={css.scroll} scrollProps={scrollProps} setContainerScroll={setContainerScroll} />
                </div>
            </div>
            <div className={styles["wrapper-section__item__map"]}>
                <div className={styles["wrapper-section__item__map-element"]}>
                    <div className={styles["grid-item__left"]}></div>
                    <div className={styles["grid-item__right"]}>
                        <ButtonGreenComponent
                            type="submit"
                            title="Создать проект"
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateProjectPage;