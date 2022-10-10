/* Libraries */
import { TextField } from '@mui/material';

/* Styles */
import styles from './TextFieldComponent.module.css';

const TextFieldComponent = ({
    title = "Текст *",
    value = "",
    placeholder = "Описание",
    changeHandler = () => { },
    required = false
}) => {
    return (
        <div>
            <span className='span__text__gray'>{title}</span>
            <TextField
                required={required}
                id="outlined-required"
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
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
        </div>
    )
}

export default TextFieldComponent;