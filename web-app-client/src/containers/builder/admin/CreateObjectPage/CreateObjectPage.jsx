/* Библиотеки */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TextField as TextFieldMUI, Autocomplete as AutocompleteMUI } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormState, useForm } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/* Контекст */
import messageQueueAction from 'src/store/actions/MessageQueueAction';
import projectAction from 'src/store/actions/ProjectAction';

/* Компоненты */
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/UI/Button/ButtonWhiteComponent';
import ProjectInfo from 'src/components/Company/ProjectInfo/ProjectInfo';
import TemplateTable from 'src/components/TemplateTable';
import LabelSelectComponent from 'src/components/LabelSelectComponent';
import MapSelectObject from 'src/components/MapSelectObject';
import DateSelect from 'src/components/UI/DateSelect';
import TextField from 'src/components/UI/TextField/TextField';
import Select from 'src/components/UI/Select';
import TextFieldControl from 'src/components/UI/TextField/TextFieldControl';

/* Хуки */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import useHttp from 'src/hooks/http.hook';

/* Утилиты */
import { utils } from 'src/utils/utils';

/* Константы */
import MainApi from 'src/constants/addresses/apis/main.api';
import AdminApi from 'src/constants/addresses/apis/admin.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import cities from 'src/data/russian-cities.json';
import TimeUploadValue from 'src/constants/values/time.upload.value';

/* Стили */
import styles from './CreateObjectPage.module.scss';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles';
import ImageUpload from 'src/components/UI/ImageUpload';
import { dataURLToBlob } from 'src/utils/file';

/* Базовые данные */
const defaultTokens = [
    [
        { value: "Номер", type_component: "text", position: '0;0' },
        { value: "Адрес", type_component: "text", position: '0;1' }
    ],
    [
        { value: "Ширина", type_component: "text", position: '1;0' },
        { value: "Статус", type_component: "text", position: '1;1' }
    ],
    [
        { value: "Длина", type_component: "text", position: '2;0' },
        { value: "Общая стоимость", type_component: "text", position: '2;1' }
    ],
    [
        { value: "Площадь", type_component: "text", position: '3;0' },
        { value: "Стоимость в кв. м.", type_component: "text", position: '3;1' }
    ]
];

/**
 * Функциональный компонент для страницы создания объектов
 * @returns {JSX.Element}
 */
const CreateObjectPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const projectSelector = useAppSelector((state) => state.projectReducer);
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
        date_delivery: new Date()
    });

    // Токены таблицы
    const [token, setToken] = useState(defaultTokens);

    // Контролеры ошибок
    const { handleSubmit, control } = useForm();
    const { errors } = useFormState({
        control
    });

    // Характеристики объекта
    const [characteristics, setCharacteristics] = useState([]);
    const [currentCharacteristic, setCurrentCharacteristic] = useState();

    // Методы оплаты
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState();

    // Коммуникации
    const [communications, setCommunications] = useState([]);
    const [currentCommunication, setCurrentCommunication] = useState();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState(cities);

    // Город, в котором расположен объект
    const [city, setCity] = useState(cities.find(o => o.name === 'Иркутск'));

    // Координаты объекта (latitude; longtitude)
    const [latLng, setLatLng] = useState({
        lat: 0,
        lng: 0
    });

    const loadingAutocomplete = open && options?.length === 0;

    const onChangeImage = (imageList) => {
        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const onSubmit = async (value) => {
        const data = {
            ...form,
            date_delivery: form.date_delivery.toISOString(),
            images: logo.map((item) => {
                return (
                    item.data_url
                );
            }),
            characteristics: characteristics,
            payment_methods: paymentMethods,
            communications: communications,
            coords: {
                city: city,
                lat: latLng.lat,
                lng: latLng.lng
            },
            tokens: token,
            file: (await utils.readAsUrl(excelFile))
        };

        dispatch(projectAction.addObjectInfo(data));
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

    // Использование хука useDropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/xml': ['.xml'],
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Выбор метки на карте для позиционирования объекта */}
            {
                modalActive && (
                    <LabelSelectComponent active={modalActive} setActive={setModalActive}>
                        {
                            city && <MapSelectObject city={city} setActive={setModalActive} setLatLng={setLatLng} />
                        }
                    </LabelSelectComponent>
                )
            }

            {/* Информация о проекте */}
            <ProjectInfo
                logo={(state.logo[0].data_url) ? state.logo[0].data_url : state.logo[0]}
                title={state.title}
                description={state.description}
            />

            {/* Основная информация об объекте */}
            <div className={styles["block"]}>
                {/* Заголовок формы создания объекта */}
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Создание объекта</span>
                </div>
                <div className={styles["block__item"]}>
                    <div className={styles["block__item-element__img"]}>
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
                            <AutocompleteMUI
                                id="asynchronous-demo"
                                sx={{ width: '18em' }}
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
                            value={(latLng.lat && latLng.lng) ? `${latLng.lat.toFixed(10)}; ${latLng.lng.toFixed(10)}` : ""}

                            clickHandler={() => {
                                setModalActive(true);
                            }}
                        />
                        <DateSelect
                            value={form.date_delivery}
                            changeHandler={(date) => changeHandler("date_delivery", date)}
                            placeholder="Дата сдачи"
                            title={"Дата сдачи"}
                        />
                    </div>
                </div>
            </div>

            {/* Характеристика объекта */}
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
                                        className={styles['element__row']}
                                        key={item}
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
                            value={currentPaymentMethod}

                            changeHandler={(e) => {
                                setCurrentPaymentMethod(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewPaymentMethodHandler} title="Добавить способ оплаты" />
                    </div>
                    <div className={styles["block__item-element__row"]}>
                        <span className='span__text__gray'>Характеристика *</span>
                        {
                            characteristics && characteristics.map((item) => {
                                return (
                                    <div
                                        className={styles['element__row']}
                                        key={item}
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
                            value={currentCharacteristic}

                            changeHandler={(e) => {
                                setCurrentCharacteristic(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewCharacteristicHandler} title="Добавить характеристику" />
                    </div>
                    <div className={styles["block__item-element__row"]}>
                        <span className='span__text__gray'>Коммуникации *</span>
                        {
                            communications && communications.map((item) => {
                                return (
                                    <div
                                        className={styles['element__row']}
                                        key={item}
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
                            value={currentCommunication}

                            changeHandler={(e) => {
                                setCurrentCommunication(e.target.value);
                            }}

                            styleTitle={{
                                display: 'none'
                            }}
                        />
                        <ButtonWhiteComponent clickHandler={addNewCommunicationHandler} title="Добавить коммуникацию" />
                    </div>
                </div>
            </div>

            {/* Информация о квартирах */}
            <div className={styles["block"]}>
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Информация о квартирах</span>
                </div>
                <span className='span__text__black'>Базовый шаблон для квартир, которые будут перенесены и систематезированны из файла(ссылки)
                    на сайт. Все единицы объекта(квартиры) должны иметь данные соответствующие шаблону ниже.
                    В противном случае не все данные на сайте отобразятся.
                    Вы можете добавлять данные в дополнительные ячейки.</span>
                <div
                    style={{ marginTop: '16px' }}
                >
                    <TemplateTable
                        token={token}
                        setToken={setToken}
                    />
                </div>
                <span className='span__text__black'>Вы также можете скачать шаблон для заполнения
                    ячеек информации о каждой отдельной квартире</span>

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
                        title={"Скачать готовый шаблон"}
                    />
                </a>

                {
                    (!stateUseLink) &&
                    <div className={styles['element__input__column']}>
                        <TextField
                            title="Файл *"
                            placeholder="Название файла"
                            value={(excelFile) ? excelFile.name : ''}
                        />
                        <div
                            style={{
                                alignSelf: 'flex-end'
                            }}
                        >
                            <div
                                {...getRootProps()}
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
                    <div className={styles['element__input__column']}>
                        <TextField
                            title="Ссылка на файл"
                            placeholder="Вставьте ссылку на файл"
                            value={(excelFile) ? excelFile.name : ''}
                        />

                        <TextField
                            title="Количество времени"
                            placeholder="Введите числовое значение"
                        />

                        <Select
                            title='Единица времени'
                            items={[
                                {
                                    value: TimeUploadValue.minute
                                },
                                {
                                    value: TimeUploadValue.hour
                                },
                                {
                                    value: TimeUploadValue.day
                                },
                            ]}

                        />

                        <div>
                            <div
                                {...getRootProps()}
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

                <div className={styles['element__input__column']}>
                    <ButtonWhiteComponent
                        clickHandler={() => {
                            window.scrollTo(0, 0);
                            navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_create);
                        }}
                        title={"Отмена"}
                    />
                    <ButtonGreenComponent
                        type={'submit'}
                        title={"Добавить объект"}
                    />
                </div>
            </div>
        </form>
    )
}

export default React.memo(CreateObjectPage);