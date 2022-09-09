import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';

import styles from './CreateObjectPage.module.css';
import { textStyleDefault } from 'src/styles';
import { root } from 'src/styles';
import ImageUploading from "react-images-uploading";
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { authSlice } from 'src/store/reducers/AuthSlice';
import useHttp from '../../../../../hooks/http.hook';
import CircularProgress from '@mui/material/CircularProgress';
import AdminApi from 'src/constants/addresses/apis/admin.api';
import MapComponent from 'src/components/MapComponent';
import ButtonGreenComponent from 'src/components/ui/buttons/ButtonGreenComponent';
import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import CompanyInfo from 'src/components/Company/CompanyInfo/CompanyInfo';
import ProjectInfo from 'src/components/Company/ProjectInfo/ProjectInfo';
import TemplateTable from 'src/components/TemplateTable';


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

    // Event Handlers Section
    const onChangeImage = (imageList, addUpdateIndex) => {
        setLogo(imageList);
    };

    const changeHandler = (key, value) => {
        setForm({ ...form, [key]: value });
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
            <div style={{
                marginTop: "64px",
                marginLeft: "64px"
            }}>
                <TemplateTable />
            </div>
        </div>
    )
}

export default CreateObjectPage;