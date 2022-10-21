/* Libraries */
import { TextField as TextFieldMUI } from '@mui/material';

/* Styles */
import styles from './TextField.module.css';

const TextField = ({
    title = "Текст *",
    value = "",
    placeholder = "Описание",
    autocomplete = 'on',
    changeHandler = () => { },
    clickHandler = () => { },
    required = false,
    styleContainer = {},
    styleTitle = {},
    styleTextField = {}
}) => {
    return (
        <div
            style={styleContainer}
        >
            <span
                className='span__text__gray'
                style={styleTitle}
            >{title}</span>
            <TextFieldMUI
                required={required}
                id="outlined-required"
                placeholder={placeholder}
                autoComplete={autocomplete}
                value={value}
                onClick={clickHandler}
                onChange={changeHandler}
                sx={{
                    marginTop: '8px',
                    borderRadius: '0px !important',
                    border: 'none',
                    width: '20em',
                    '&:hover fieldset': {
                        border: '1px solid #424041 !important',
                        borderRadius: '0px',
                    },
                    'fieldset': {
                        border: '1px solid #424041 !important',
                        borderRadius: '0px',
                    },

                    ...styleTextField
                }}
            />
        </div>
    )
}

export default TextField;