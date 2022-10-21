/* Libraries */
import React, { useState, useEffect } from 'react';
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
import ObjectCard from 'src/components/ObjectCard';
import AutocompleteControl from 'src/components/UI/Autocomplete/AutocompleteControl';

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
import styles from './CreateProjectPage.module.css';
import companyAction from 'src/store/actions/CompanyAction';

import logoDefault from 'src/resources/images/logo-default.png'
import buildingExample1 from 'src/resources/images/building-example-1.webp'
import buildingExample2 from 'src/resources/images/building-exapmle-2.webp'
import buildingExample3 from 'src/resources/images/building-example-3.jpg'

const buildings = [
    {
        id: 1,
        developerCompanyLogo: logoDefault,
        images: [buildingExample1, buildingExample2, buildingExample3],
        projectName: 'Объект',
        year: 2025,
        developer: 'Застройщик 1',
        address: 'ул. Мира 15, 76',
        square: 50,
        price: 10,
    },
    {
        id: 2,
        developerCompanyLogo: logoDefault,
        projectName: 'Объект',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 3,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Объехт',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 4,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Объехт',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 5,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Объехт',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 6,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Объехт',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
]


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

        console.log({
            title: projectSelector.title,
            description: projectSelector.description,
            managers: projectSelector.managers,
            uuid: userSelector.company?.uuid
        });
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
                <div className={styles["wrapper-section__item-element__column"]}>
                    <span className='span__text__black-h3'>Создание проекта</span>
                </div>
                <div className={styles["wrapper-section__item-element__column"]}>
                    <div className={styles["item-element__column"]}>
                        <ImageUpload
                            value={projectSelector.logo}
                            onChange={onChangeImage}
                        />
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
                        <AutocompleteControl
                            multiple={true}
                            title={"Менеджеры компании"}
                            control={control}
                            errors={errors}
                            name={"managers"}
                            optionName={"email"}
                            defaultValue={projectSelector?.managers}
                            changeHandler={changeHandler}
                            getOptionLabel={(option) => option.email}
                            isOptionEqualToValue={(option, value) => option.email === value.email}
                            options={options}
                            loading={loadingAutocomplete}
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />
                    </div>
                    <div className={styles["item-element__column"]}>
                        <TextFieldControl
                            title={"Описание"}
                            control={control}
                            errors={errors}
                            name={"description"}
                            defaultValue={projectSelector.description}
                            multiline={true}
                            rows={9}
                            placeholder={"Описание"}
                            changeHandler={changeHandler}
                            styleContainer={{
                                height: '18em'
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
                <div className={styles["container"]}>
                    <div className={styles["list"]}>
                        {buildings.map(it => <ObjectCard key={it.id} building={it} />)}
                    </div>
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

export default React.memo(CreateProjectPage);