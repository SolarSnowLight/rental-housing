/* Libraries */
import React, { FC, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField } from '@mui/material';
import { useFormState, Controller, useForm } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input';

/* Context */
import userAction from 'src/store/actions/UserAction';
import messageQueueAction from 'src/store/actions/MessageQueueAction';

/* Components */
import ImageUpload from 'src/components/UI/ImageUpload';
import CircularIndeterminate from 'src/components/UI/CircularIndeterminate';
import TextFieldControl from 'src/components/UI/TextField/TextFieldControl';
import AutocompleteControl from 'src/components/UI/Autocomplete/AutocompleteControl';
import ButtonGreenComponent from 'src/components/UI/Button/ButtonGreenComponent';

/* Hooks */
import { useAppSelector } from 'src/hooks/redux.hook';
import { useAppDispatch } from 'src/hooks/redux.hook';
import useHttp from 'src/hooks/http.hook';

/* Dtos */
import CompanyUpdateDto from 'src/dtos/company.update-dto';

/* Utils */
import { dataURLToBlob, isDataURL } from 'src/utils/file';

/* Constants */
import AdminApi from 'src/constants/addresses/apis/admin.api';

/* Styles */
import styles from "./CompanyEditPage.module.scss";

const CompanyEditPage = () => {
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

        const file = imageList.map((item) => {
            return {
                data_url: item.data_url
            }
        });

        dispatch(userAction.setItemCompanyInfo("logo", file));
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
        if (userSelector.company && userSelector.company.data.logo.length <= 0) {
            dispatch(messageQueueAction.addMessage(null, "error", "???????????????????? ???????????????? ?????????????? ????????????????!"));
            return;
        }

        let file = userSelector.company.data.logo[0];

        if ((file)
            && (Object.keys(file).length >= 1)
            && (Object.getPrototypeOf(file) === Object.prototype)
            && (!isDataURL(file.data_url))) {
            file = dataURLToBlob(userSelector.company.data.logo[0].data_url);
        } else {
            file = null;
        }

        dispatch(userAction.companyInfoUpdate(
            {
                ...new CompanyUpdateDto({
                    uuid: userSelector.company.uuid,
                    ...userSelector.company.data
                })
            },
            file
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
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                (userSelector.isLoading) && <CircularIndeterminate />
            }
            <div className={styles['flex-container']}>
                <div className={styles['flex-item']}>
                    <span className={styles['span-text']}>???????????????????????????? ??????????????????????</span>
                </div>
                <div className={styles['flex-item']}>
                    <ImageUpload
                        title={"?????????????? *"}
                        value={userSelector.company?.data.logo}
                        onChange={onChangeImage}
                    />
                    <TextFieldControl
                        title={"????????????????"}
                        control={control}
                        errors={errors}
                        name={"description"}
                        defaultValue={userSelector.company?.data.description}
                        multiline={true}
                        rows={9}
                        placeholder={"????????????????"}
                        changeHandler={changeHandler}
                        styleContainer={{
                            height: '18em'
                        }}
                    />
                </div>
                <div className={styles['flex-item']}>
                    <TextFieldControl
                        title={"???????????????? *"}
                        required={true}
                        control={control}
                        errors={errors}
                        name={"title"}
                        defaultValue={userSelector.company?.data.title}
                        placeholder={"?????????????? ???????????????? ????????????????"}
                        changeHandler={changeHandler}
                    />
                    <TextFieldControl
                        title={"Email *"}
                        required={true}
                        control={control}
                        errors={errors}
                        name={"email_company"}
                        defaultValue={userSelector.company?.data.email_company}
                        placeholder={"?????????????? email"}
                        changeHandler={changeHandler}
                    />
                    <TextFieldControl
                        title={"?????????? ???????????????? *"}
                        required={true}
                        control={control}
                        errors={errors}
                        name={"phone"}
                        defaultValue={userSelector.company?.data.phone}
                        placeholder={"?????????????? ?????????? ????????????????"}
                        changeHandler={changeHandler}
                        View={MuiTelInput}
                    />
                    <TextFieldControl
                        title={"???????????? ???? ???????? *"}
                        required={true}
                        control={control}
                        errors={errors}
                        name={"link"}
                        defaultValue={userSelector.company?.data.link}
                        placeholder={"?????????????? ????????????"}
                        changeHandler={changeHandler}
                    />
                </div>
                <div className={styles['flex-item']}>
                    <AutocompleteControl
                        title={"?????????????????????????? ????????????????"}
                        control={control}
                        errors={errors}
                        name={"email_admin"}
                        optionName={"email"}
                        defaultValue={{ "email": userSelector.company?.data.email_admin }}
                        placeholder={"?????????????? ????????????"}
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
                    <ButtonGreenComponent
                        type={'submit'}
                        variant={"contained"}
                        disabled={btnDisabled}
                        title={"?????????????????? ??????????????????"}
                    />
                </div>
            </div>
        </form>
    );
};

export default React.memo(CompanyEditPage);
