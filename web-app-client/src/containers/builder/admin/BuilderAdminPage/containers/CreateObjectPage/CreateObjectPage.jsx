import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';

import styles from './CreateObjectPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles';
import ImageUploading from "react-images-uploading";
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { authSlice } from 'src/store/reducers/AuthSlice';
import useHttp from '../../../../../../hooks/http.hook';
import CircularProgress from '@mui/material/CircularProgress';
import AdminApi from 'src/constants/addresses/apis/admin.api';
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/ui/buttons/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import CompanyInfo from 'src/components/Company/CompanyInfo/CompanyInfo';
import ProjectInfo from 'src/components/Company/ProjectInfo/ProjectInfo';
import TemplateTable from 'src/components/TemplateTable';
import TextFieldComponent from 'src/components/ui/textfields/TextFieldComponent';


const CreateObjectPage = () => {
    // Section of working with the network over the HTTP protocol
    const auth = useAppSelector((state) => state.authReducer);
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
    const [logo, setLogo] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '',
        email: '', phone: '',
        link: '', admin: ''
    });

    const [characteristics, setCharacteristics] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [communications, setCommunications] = useState([]);

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    // Charactetistic
    const addNewCharacteristicHandler = () => {
        const data = JSON.parse(JSON.stringify(characteristics));
        data.push(data.length + 1);

        setCharacteristics(data);
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
        const data = JSON.parse(JSON.stringify(paymentMethods));
        data.push(data.length + 1);

        setPaymentMethods(data);
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
        const data = JSON.parse(JSON.stringify(communications));
        data.push(data.length + 1);

        setCommunications(data);
    }

    const deleteCommunicationHandler = (item) => {
        const data = JSON.parse(JSON.stringify(communications));
        const index = data.indexOf(item);

        if (index >= 0) {
            data.splice(index, 1);
        }

        setCommunications(data);
    }

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
        <div>
            <ProjectInfo />
            <div className={styles["block"]}>
                <div className={styles["block__item"]}>
                    <span className='span__text__black-h3'>Создание объекта</span>
                </div>
                <div className={styles["block__item"]}>
                    <div className={styles["block__item-element"]}>
                        <div>
                            <span className='span__text__gray'>Фото *</span>
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
                                                                width: 'max-content',
                                                                height: '2em',
                                                                ...textStyleDefault,
                                                                ":hover": {
                                                                    backgroundColor: root.colorGreen,
                                                                    fontSize: '14px !important',
                                                                    borderRadius: '0px !important',
                                                                    border: '1px solid #424041 !important',
                                                                    width: 'max-content',
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
                    </div>
                    <div className={styles["block__item-element"]}>
                        <div>
                            <span className='span__text__gray'>Название *</span>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder="Название компании"
                                onChange={(e) => {
                                }}
                                sx={{
                                    marginTop: '8px',
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
                        <div>
                            <span className='span__text__gray'>Адрес</span>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder="Название компании"
                                onChange={(e) => {
                                }}
                                sx={{
                                    marginTop: '8px',
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
                        <div>
                            <span className='span__text__gray'>Координаты *</span>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder="Название компании"
                                onChange={(e) => {
                                }}
                                sx={{
                                    marginTop: '8px',
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
                        <div>
                            <span className='span__text__gray'>Дата сдачи</span>
                            <TextField
                                required
                                id="outlined-required"
                                placeholder="Название компании"
                                onChange={(e) => {
                                }}
                                sx={{
                                    marginTop: '8px',
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
                                        <TextFieldComponent
                                            value={item}
                                            title="Способ оплаты"
                                            headerVisible={false}
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
                            required
                            id="outlined-required"
                            placeholder="Способ оплаты"
                            onChange={(e) => {
                            }}
                            sx={{
                                marginTop: '16px',
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
                                        <TextFieldComponent
                                            value={item}
                                            title="Характеристика"
                                            headerVisible={false}
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
                            required
                            id="outlined-required"
                            placeholder="Характеристика"
                            onChange={(e) => {
                            }}
                            sx={{
                                marginTop: '16px',
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
                                        <TextFieldComponent
                                            value={item}
                                            title="Коммуникация"
                                            headerVisible={false}
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
                            required
                            id="outlined-required"
                            placeholder="Коммуникация"
                            onChange={(e) => {
                            }}
                            sx={{
                                marginTop: '16px',
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
                <ButtonGreenComponent
                    style={{
                        marginTop: '16px',
                        width: '17.8em',
                        height: '2.8em'
                    }}
                    title={"Скачать готовый шаблон"}
                />
                <div style={{
                    marginTop: '16px',
                    display: 'grid',
                    gridAutoFlow: 'column',
                    backgroundColor: 'yellow'
                }}>
                    <div
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'row'
                        }}
                    >
                        <span className='span__text__gray'>Файл *</span>
                        <TextField
                            required
                            id="outlined-required"
                            placeholder="Способ оплаты"
                            onChange={(e) => {
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
                    <div>
                        <span className='span__text__black'>или</span>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridAutoFlow: 'row'
                        }}
                    >
                        <ButtonGreenComponent title={"Выбрать файл"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateObjectPage;