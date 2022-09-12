import React from 'react';
import { TextField } from '@mui/material';
import styles from './TextFieldComponent.module.css';

const TextFieldComponent = ({ value = "", headerVisible = true, title = "", changeHandler = () => { } }) => {
    return (
        <div>
            {
                headerVisible &&
                <span className='span__text__gray'>{title}</span>
            }
            <TextField
                required
                id="outlined-required"
                placeholder={title}
                onChange={changeHandler}
                value={value}
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
    )
}

export default TextFieldComponent;