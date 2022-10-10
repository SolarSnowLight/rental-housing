/* Libraries */
import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

/* Styles */
import styles from './AutocompleteControlComponent.module.css';

const AutocompleteControlComponent = ({
    title = "Текст *",
    placeholder = "Описание",
    changeHandler = () => { },
    readOnly = false,
    control,
    errors,
    defaultValue,
    name,
    optionName,
    options,
    loading,
    open,
    onClose,
    onOpen,
    isOptionEqualToValue,
    getOptionLabel,
}) => {
    return (
        <div
            className={styles["wrapper"]}
        >
            <span className='span__text__gray'>{title}</span>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Autocomplete
                        readOnly={readOnly}
                        id="tags-outlined"
                        open={open}
                        onOpen={onOpen}
                        onClose={onClose}
                        defaultValue={defaultValue}
                        getOptionLabel={getOptionLabel}
                        isOptionEqualToValue={isOptionEqualToValue}
                        options={options}
                        loading={loading}
                        onChange={(e, value) => {
                            field.value = value[optionName];
                            changeHandler(name, value[optionName]);
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
                )}
            />
        </div>
    )
}

export default AutocompleteControlComponent;