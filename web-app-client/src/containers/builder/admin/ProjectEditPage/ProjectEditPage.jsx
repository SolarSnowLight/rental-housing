/* Libraries */
import React, { useState, useEffect } from 'react';
import { TextField as TextFieldMUI, Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useForm, useFormState } from 'react-hook-form';

/* Context */
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Components */
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import TextField from 'src/components/UI/TextField/TextField';
import ImageUpload from 'src/components/UI/ImageUpload';
import ObjectCard from 'src/components/ProjectInfo/ObjectCard';

/* Hooks */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import useHttp from 'src/hooks/http.hook';

/* DTO */
import ProjectUpdateDto from 'src/dtos/project.update-dto';

/* Constants */
import AdminApi from 'src/constants/addresses/apis/admin.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import MainApi from 'src/constants/addresses/apis/main.api';

/* Styles */
import styles from './ProjectEditPage.module.css';
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


const objects = [...Array(6).keys()].map(i => ({
    id: i + '',
    builderLogo: logoDefault,
    images: [buildingExample1, buildingExample2, buildingExample3],
    objectName: 'Название объекта',
    year: 2025,
    objectCnt: i + 1,
}))
objects[0].images = [buildingExample1, buildingExample2, buildingExample3, homePage, imagePlaceholder, mainPageBgc, neonSunrise, retrowave1, hotlineMiami2, needMoreAcidMarkII, retrowave2]

const ProjectEditPage = () => {
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();
    const { state } = useLocation();

    useEffect(() => {
        dispatch(messageQueueAction.addMessage(null, "error", error));
        clearError();
    }, [error, clearError]);

    // The data section presented on the page
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [logo, setLogo] = useState(
        (state?.data.logo) ?
            [
                {
                    data_url: `${MainApi.main_server}/${state.data.logo}`
                }
            ]
            :
            []
    );

    const [form, setForm] = useState({
        title: state?.data.title,
        description: state?.data.description,
        managers: state?.data.managers
    });

    // Event Handlers Section
    const onChangeImage = (imageList) => {
        if (imageList.length <= 0) {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
        }

        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setBtnDisabled(false);
        setForm({ ...form, [key]: value });
    };

    const onSubmit = (data) => {
        if (logo.length <= 0) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо добавить логотип проекта!"));
            return;
        }

        dispatch(companyAction.projectInfoUpdate(
            {
                ...(new ProjectUpdateDto({
                    uuid: state.uuid,
                    ...form
                }))
            },
            (logo[0].file) ? logo[0].file : null
        ))

        setBtnDisabled(true);
    };

    const { handleSubmit, control } = useForm();

    const { errors } = useFormState({
        control
    });

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
        navigate(BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_add_object);
    }

    return (
        <form className={styles["wrapper-section"]} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["wrapper-section__item"]}>
                <div>
                    <span className='span__text__black-h3'>Информация о проекте</span>
                </div>
                <div className={styles["wrapper-section__item-element__column"]}>
                    <div>
                        <div className={styles["wrapper-section__item-element"]}>
                            <ImageUpload
                                title={"Логотип *"}
                                value={logo}
                                onChange={onChangeImage}
                            />
                        </div>
                        <div className={styles["wrapper-section__item-element"]}>
                            <TextField
                                title={"Название *"}
                                required={true}
                                changeHandler={(e) => {
                                    changeHandler("title", e.target.value);
                                }}
                                defaultValue={form.title}
                            />
                        </div>
                        <div className={styles["wrapper-section__item-element"]}>
                            <div>
                                <span className='span__text__gray'>Менеджеры проекта</span>
                            </div>
                            <div>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    defaultValue={form.managers}
                                    getOptionLabel={(option) => option.email}
                                    isOptionEqualToValue={(option, value) => option.email === value.email}
                                    options={options}
                                    loading={loadingAutocomplete}
                                    onChange={(e, value) => {
                                        changeHandler("admin", value.email);
                                    }}
                                    renderInput={(params) => (
                                        <TextFieldMUI
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
                        <TextField
                            title={"Описание"}
                            multiline={true}
                            rows={9}
                            placeholder={"Описание"}
                            changeHandler={(e) => {
                                changeHandler("description", e.target.value);
                            }}
                            defaultValue={form.description}
                            styleTextField={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
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
                            type="submit"
                            title="Сохранить изменения"
                            disabled={btnDisabled}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ProjectEditPage;