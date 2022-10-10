/* Libraries */
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField } from '@mui/material';
import { useFormState, Controller, useForm } from 'react-hook-form';

/* Context */
import userAction from 'src/store/actions/UserAction';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Components */
import ImageUpload from 'src/components/ImageUpload';
import CircularIndeterminate from 'src/components/CircularIndeterminate';
import TextFieldControlComponent from 'src/components/TextField/TextFieldControlComponent';
import AutocompleteControlComponent from 'src/components/Autocomplete/AutocompleteControlComponent';
import ButtonGreenComponent from 'src/components/ui/buttons/ButtonGreenComponent';

/* Hooks */
import { useAppSelector } from 'src/hooks/redux.hook';
import { useAppDispatch } from 'src/hooks/redux.hook';
import useHttp from 'src/hooks/http.hook';

/* Dtos */
import CompanyUpdateDto from 'src/dtos/company.update-dto';

/* Constants */
import AdminApi from 'src/constants/addresses/apis/admin.api';

/* Styles */
import styles from './BuilderAdminPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles/index';
import { MuiTelInput } from 'mui-tel-input';
import { emailValidation, linkValidation } from 'src/validation-schemes/validation';

const BuilderAdminPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(userAction.getUserCompany());
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
            dispatch(messageQueueAction.addMessage(null, "error", "Необходимо добавить логотип компании!"));
            return;
        }

        dispatch(userAction.companyInfoUpdate(
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
                (userSelector.isLoading) && <CircularIndeterminate />
            }
            <div className={styles["admin-page__container--row"]}>
                <span className={styles["admin-page__h2"]}>Изменение информации о компании</span>
            </div>
            <div className={styles["admin-page__container--row"]}>
                <ImageUpload
                    title={"Логотип *"}
                    value={userSelector.company?.data.logo}
                    onChange={onChangeImage}
                />
                <TextFieldControlComponent
                    title={"Описание"}
                    control={control}
                    errors={errors}
                    name={"description"}
                    defaultValue={userSelector.company?.data.description}
                    multiline={true}
                    rows={9}
                    placeholder={"Описание"}
                    changeHandler={changeHandler}
                />
            </div>
            <div className={styles["admin-page__container--row"]}>
                <TextFieldControlComponent
                    title={"Название *"}
                    required={true}
                    control={control}
                    errors={errors}
                    name={"title"}
                    defaultValue={userSelector.company?.data.title}
                    placeholder={"Введите название компании"}
                    changeHandler={changeHandler}
                />
                <TextFieldControlComponent
                    title={"Email *"}
                    required={true}
                    control={control}
                    errors={errors}
                    name={"email_company"}
                    defaultValue={userSelector.company?.data.email_company}
                    placeholder={"Введите email"}
                    changeHandler={changeHandler}
                />
                <TextFieldControlComponent
                    title={"Номер телефона *"}
                    required={true}
                    control={control}
                    errors={errors}
                    name={"phone"}
                    defaultValue={userSelector.company?.data.phone}
                    placeholder={"Введите номер телефона"}
                    changeHandler={changeHandler}
                    View={MuiTelInput}
                />
                <TextFieldControlComponent
                    title={"Ссылка на сайт *"}
                    required={true}
                    control={control}
                    errors={errors}
                    name={"link"}
                    defaultValue={userSelector.company?.data.link}
                    placeholder={"Введите ссылку"}
                    changeHandler={changeHandler}
                />
            </div>
            <div className={styles["admin-page__container--row"]}>
                <AutocompleteControlComponent
                    title={"Администратор компании"}
                    control={control}
                    errors={errors}
                    name={"email_admin"}
                    optionName={"email"}
                    defaultValue={{ "email": userSelector.company?.data.email_admin }}
                    placeholder={"Введите ссылку"}
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
                    readOnly={true}
                />
            </div>
            <div className={styles["admin-page__container--row"]}>
                <div className={styles["admin-page__container--row-btn"]}>
                    <ButtonGreenComponent
                        type={'submit'}
                        variant={"contained"}
                        disabled={btnDisabled}
                        title={"Сохранить изменения"}
                    />
                </div>
            </div>
        </form>
    );
}

export default BuilderAdminPage;