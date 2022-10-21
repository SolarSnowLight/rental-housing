/* Libraries */
import React, { useState, useEffect, useCallback } from 'react';
import { TextField as TextFieldMUI, Button, Autocomplete } from '@mui/material';
import ImageUploading from "react-images-uploading";
import { useDropzone } from 'react-dropzone';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormState, Controller, useForm } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { FormControl, MenuItem } from '@mui/material';

/* Context */
import { authSlice } from 'src/store/reducers/AuthSlice';

/* Components */
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ProjectInfo from 'src/components/Company/ProjectInfo/ProjectInfo';
import TemplateTable from 'src/components/TemplateTable';
import LabelSelectComponent from 'src/components/LabelSelectComponent';
import MapSelectComponent from 'src/components/MapSelectComponent';
import DateSelect from 'src/components/UI/DateSelect';
import TextField from 'src/components/UI/TextField/TextField';
import Select from 'src/components/UI/Select';

/* Hooks */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import useHttp from 'src/hooks/http.hook';

/* Constants */
import MainApi from 'src/constants/addresses/apis/main.api';
import AdminApi from 'src/constants/addresses/apis/admin.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import cities from 'src/data/russian-cities.json';

/* Styles */
import styles from './CreateObjectPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles';
import ImageUpload from 'src/components/UI/ImageUpload';
import messageQueueAction from 'src/store/actions/MessageQueueAction';
import TextFieldControl from 'src/components/UI/TextField/TextFieldControl';

/**
 * Functional component for create object in project
 * @returns {JSX.Element}
 */
const CreateObjectPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const { loading, request, error, clearError } = useHttp();
    const [modalActive, setModalActive] = useState(false);
    const [modalText, setModalText] = useState(null);
    const navigate = useNavigate();
    const message = useMessageToastify();
    const { state } = useLocation();
    const [stateUseLink, setStateUseLink] = useState(false);

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [logo, setLogo] = useState([]);
    const [form, setForm] = useState({
        title: '',
        date_end: new Date()
    });

    // Form controls
    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    });

    // Characteristics
    const [characteristics, setCharacteristics] = useState([]);
    const [currentCharacteristic, setCurrentCharacteristic] = useState();

    // Payment methods
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState();

    // Communications
    const [communications, setCommunications] = useState([]);
    const [currentCommunication, setCurrentCommunication] = useState();

    // Data section of functional operation of components
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState(cities);

    // City
    const [city, setCity] = useState(cities.find(o => o.name === 'Иркутск'));

    // (latitude; longtitude)
    const [latLng, setLatLng] = useState({
        lat: 0,
        lng: 0
    });

    const loadingAutocomplete = open && options?.length === 0;

    // Event Handlers Section
    const onChangeImage = (imageList) => {
        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    // Charactetistic
    const addNewCharacteristicHandler = () => {
        if ((!currentCharacteristic) || (currentCharacteristic.length <= 0)) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо ввести название характеристики"));
            return;
        }

        const data = JSON.parse(JSON.stringify(characteristics));
        data.push(currentCharacteristic);

        setCharacteristics(data);
        setCurrentCharacteristic('');
    }

    const deleteCharacteristicHandler = (item) => {
        const data = JSON.parse(JSON.stringify(characteristics));
        const index = data.indexOf(item);

        if (index >= 0) {
            data.splice(index, 1);
        }

        setCharacteristics(data);
    }

    // Payment method
    const addNewPaymentMethodHandler = () => {
        if ((!currentPaymentMethod) || (currentPaymentMethod.length <= 0)) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо ввести название способа оплаты"));
            return;
        }

        const data = JSON.parse(JSON.stringify(paymentMethods));
        data.push(currentPaymentMethod);

        setPaymentMethods(data);
        setCurrentPaymentMethod('');
    }

    const deletePaymentMethodHandler = (item) => {
        const data = JSON.parse(JSON.stringify(paymentMethods));
        const index = data.indexOf(item);

        if (index >= 0) {
            data.splice(index, 1);
        }

        setPaymentMethods(data);
    }

    // Communication
    const addNewCommunicationHandler = () => {
        if ((!currentCommunication) || (currentCommunication.length <= 0)) {
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо ввести название коммуникации"));
            return;
        }

        const data = JSON.parse(JSON.stringify(communications));
        data.push(currentCommunication);

        setCommunications(data);
        setCurrentCommunication('');
    }

    const deleteCommunicationHandler = (item) => {
        const data = JSON.parse(JSON.stringify(communications));
        const index = data.indexOf(item);

        if (index >= 0) {
            data.splice(index, 1);
        }

        setCommunications(data);
    }

    useEffect(() => {
        message(error, "error");
        clearError();
    }, [error, message, clearError]);

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

    const [excelFile, setExcelFile] = useState(null);
    const onDrop = useCallback(acceptedFiles => {
        setExcelFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/xml': ['.xml'],
        }
    });

    return (
        <form>
            <LabelSelectComponent active={modalActive} setActive={setModalActive}>
                {
                    city && <MapSelectComponent city={city} setActive={setModalActive} setLatLng={setLatLng} />
                }
            </LabelSelectComponent>
            <ProjectInfo
                logo={(state.logo[0].data_url) ? state.logo[0].data_url : state.logo[0]}
                title={state.title}
                description={state.description}
            />
            <div className={styles["block"]}>
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Создание объекта</span>
                </div>
                <div className={styles["block__item"]}>
                    <div className={styles["block__item-element"]}>
                        <ImageUpload
                            title={"Изображение *"}
                            value={logo}
                            onChange={onChangeImage}
                            multiple={true}
                        />
                    </div>
                    <div className={styles["block__item-element"]}>
                        <TextField
                            title={"Название *"}
                            placeholder={"Название объекта"}
                            required={true}
                            value={form.title}

                            changeHandler={(e) => {
                                changeHandler("title", e.target.value)
                            }}
                        />
                        <div>
                            <span className='span__text__gray'>Город *</span>
                            <Autocomplete
                                id="asynchronous-demo"
                                sx={{ width: '20em' }}
                                isOptionEqualToValue={(option, value) => `${option.name}, ${option.district}, ${option.subject}` === `${value.name}, ${value.district}, ${value.subject}`}
                                getOptionLabel={(option) => `${option.name}, ${option.district}, ${option.subject}`}
                                options={cityOptions}
                                loading={loading}
                                value={city}
                                onChange={(e, value) => {
                                    setCity(value);
                                }}
                                renderInput={(params) => (
                                    <TextFieldMUI
                                        {...params}
                                        sx={{
                                            marginTop: '8px',
                                            borderRadius: '0px !important',
                                            border: 'none',
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

                        <TextField
                            title={"Координаты *"}
                            placeholder={"Выбрать latiitude; longtitude"}
                            autocomplete={"off"}
                            required={true}
                            value={(latLng.lat && latLng.lng) ? `${latLng.lat.toFixed(10)}; ${latLng.lng.toFixed(10)}` : null}

                            clickHandler={() => {
                                setModalActive(true);
                            }}

                            styleContainer={{
                                marginLeft: '32px',
                            }}
                        />
                        <DateSelect
                            value={form.date_end}
                            changeHandler={(date) => changeHandler("date_end", date)}
                            placeholder="Дата сдачи"
                            title={"Дата сдачи"}
                        />
                    </div>
                </div>
            </div>
            <div className={styles["block"]}>
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Характеристика объекта</span>
                </div>
                <div className={styles["block__item__column"]}>
                    <div className={styles["block__item-element__row"]}>
                        <span className='span__text__gray'>Способ оплаты *</span>
                        {
                            paymentMethods && paymentMethods.map((item) => {
                                return (
                                    <div
                                        style={{
                                            marginTop: '16px'
                                        }}
                                    >
                                        <TextField
                                            value={item}
                                            title="Способ оплаты"
                                            styleTitle={{
                                                display: "none"
                                            }}
                                            autocomplete="off"
                                        />
                                        <span
                                            className='span__text__gray'
                                            style={{
                                                display: 'grid',
                                                justifyContent: 'right'
                                            }}
                                            onClick={() => {
                                                deletePaymentMethodHandler(item);
                                            }}
                                        >Удалить</span>
                                    </div>
                                );
                            })
                        }

                        <TextField
                            placeholder={"Введите способ оплаты"}
                            autocomplete={"off"}
                            required={true}
                            value={currentPaymentMethod}

                            changeHandler={(e) => {
                                setCurrentPaymentMethod(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewPaymentMethodHandler} style={{ marginTop: "2em", width: "100%", height: "2.8em" }} title="Добавить способ оплаты" />
                    </div>
                    <div className={styles["block__item-element__row"]}>
                        <span className='span__text__gray'>Характеристика *</span>
                        {
                            characteristics && characteristics.map((item) => {
                                return (
                                    <div
                                        style={{
                                            marginTop: '16px'
                                        }}
                                    >
                                        <TextField
                                            value={item}
                                            title="Характеристика"
                                            styleTitle={{
                                                display: "none"
                                            }}
                                            autocomplete="off"
                                        />
                                        <span
                                            className='span__text__gray'
                                            style={{
                                                display: 'grid',
                                                justifyContent: 'right'
                                            }}
                                            onClick={() => {
                                                deleteCharacteristicHandler(item);
                                            }}
                                        >Удалить</span>
                                    </div>
                                );
                            })
                        }


                        <TextField
                            placeholder={"Введите новую характеристику"}
                            autocomplete={"off"}
                            required={true}
                            value={currentCharacteristic}

                            changeHandler={(e) => {
                                setCurrentCharacteristic(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewCharacteristicHandler} style={{ marginTop: "2em", width: "100%", height: "2.8em" }} title="Добавить характеристику" />
                    </div>
                    <div className={styles["block__item-element__row"]}>
                        <span className='span__text__gray'>Коммуникации *</span>
                        {
                            communications && communications.map((item) => {
                                return (
                                    <div
                                        style={{
                                            marginTop: '16px'
                                        }}
                                    >
                                        <TextField
                                            value={item}
                                            title="Коммуникация"
                                            styleTitle={{
                                                display: "none"
                                            }}
                                            autocomplete="off"
                                        />
                                        <span
                                            className='span__text__gray'
                                            style={{
                                                display: 'grid',
                                                justifyContent: 'right'
                                            }}
                                            onClick={() => {
                                                deleteCommunicationHandler(item);
                                            }}
                                        >Удалить</span>
                                    </div>
                                );
                            })
                        }
                        <TextField
                            placeholder={"Введите коммуникацию"}
                            autocomplete={"off"}
                            required={true}
                            value={currentCommunication}

                            changeHandler={(e) => {
                                setCurrentCommunication(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewCommunicationHandler} style={{ marginTop: "2em", width: "100%", height: "2.8em" }} title="Добавить коммуникацию" />
                    </div>
                </div>
            </div>
            <div className={styles["block"]}>
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Информация о квартирах</span>
                </div>
                <div
                    style={{ width: '54em' }}
                >
                    <span className='span__text__black'>Базовый шаблон для квартир, которые будут перенесены и систематезированны из файла(ссылки)
                        на сайт. Все единицы объекта(квартиры) должны иметь данные соответствующие шаблону ниже.
                        В противном случае не все данные на сайте отобразятся.
                        Вы можете добавлять данные в дополнительные ячейки.</span>
                </div>
                <div
                    style={{ marginTop: '16px' }}
                >
                    <TemplateTable />
                </div>
                <div
                    style={{ width: '54em', marginTop: '32px' }}
                >
                    <span className='span__text__black'>Вы также можете скачать шаблон для заполнения
                        ячеек информации о каждой отдельной квартире</span>
                </div>

                <FormGroup>
                    <FormControlLabel control={
                        <Switch
                            onChange={(e) => {
                                setStateUseLink(e.target.checked);
                            }}
                        />
                    } label="Использовать ссылку" />
                </FormGroup>

                <a
                    style={{
                        textDecoration: 'none'
                    }}
                    href={`${MainApi.main_server}/public/template/template_object.xlsx`}
                    download
                >
                    <ButtonGreenComponent
                        style={{
                            marginTop: '16px',
                            width: '17.8em',
                            height: '2.8em'
                        }}
                        title={"Скачать готовый шаблон"}
                    />
                </a>

                {
                    (!stateUseLink) &&
                    <div style={{
                        marginTop: '16px',
                        display: 'grid',
                        gridAutoFlow: 'column',
                        alignItems: 'center'
                    }}>
                        <TextField
                            title="Файл *"
                            placeholder="Название файла"
                            value={(excelFile) ? excelFile.name : ''}

                            styleContainer={{
                                display: 'grid',
                                gridAutoFlow: 'row'
                            }}
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridAutoFlow: 'row',
                                alignItems: 'flex-end',
                                height: '100%',
                                width: 'max-content'
                            }}
                        >
                            <div
                                {...getRootProps()}
                                style={{
                                    display: 'grid',
                                    gridAutoFlow: 'row',
                                }}
                            >
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <span>is drag active</span>
                                        : <ButtonGreenComponent title={"Загрузить файл"} />
                                }
                            </div>
                        </div>
                    </div>
                }

                {
                    (stateUseLink) &&
                    <div style={{
                        marginTop: '16px',
                        display: 'grid',
                        gridAutoFlow: 'column',
                        alignItems: 'center'
                    }}>
                        <TextField
                            title="Ссылка на файл"
                            placeholder="Вставьте ссылку на файл"
                            value={(excelFile) ? excelFile.name : ''}

                            styleContainer={{
                                display: 'grid',
                                gridAutoFlow: 'row'
                            }}
                        />

                        <TextField
                            title="Количество времени"
                            placeholder="Введите числовое значение"

                            styleContainer={{
                                display: 'grid',
                                gridAutoFlow: 'row'
                            }}
                        />

                        <Select
                            title='Единица времени'
                            items={[
                                {
                                    value: "минуты"
                                },
                                {
                                    value: "часы"
                                },
                                {
                                    value: "дни"
                                },
                            ]}
                        />

                        <div
                            style={{
                                display: 'grid',
                                gridAutoFlow: 'row',
                                alignItems: 'flex-end',
                                height: '100%',
                                width: 'max-content'
                            }}
                        >
                            <div
                                {...getRootProps()}
                                style={{
                                    display: 'grid',
                                    gridAutoFlow: 'row',
                                }}
                            >
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <span>is drag active</span>
                                        : <ButtonGreenComponent title={"Загрузить файл"} />
                                }
                            </div>
                        </div>
                    </div>
                }

                <div style={{
                    marginTop: '16px',
                    display: 'grid',
                    gridAutoFlow: 'column',
                    alignItems: 'center'
                }}>
                    <div
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'row',
                            alignItems: 'flex-end',
                            height: '100%',
                            width: 'max-content'
                        }}
                    >
                        <ButtonWhiteComponent
                            style={{
                                width: '17.8em',
                                height: '100%',
                            }}
                            clickHandler={() => {
                                window.scrollTo(0, 0);
                                navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_create);
                            }}
                            title={"Отмена"}
                        />
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'row',
                            alignItems: 'flex-end',
                            height: '100%',
                            width: 'max-content'
                        }}
                    >
                        <ButtonGreenComponent
                            type={'submit'}
                            title={"Добавить объект"}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default React.memo(CreateObjectPage);