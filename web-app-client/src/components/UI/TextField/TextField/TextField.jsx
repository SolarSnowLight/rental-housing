/* Libraries */
import { TextField as TextFieldMUI } from '@mui/material';

/* Styles */
import styles from './TextField.module.css';

/**
 * Component for use text field from MUI
 * @param {object} param0 - props for component
 * @returns {JSX.Element}
 */
const TextField = ({
    title = "Текст *",
    value = "",
    placeholder = "Описание",
    autocomplete = 'on',
    changeHandler = () => { },
    clickHandler = () => { },
    required = false,
    multiline = false,
    rows = 1,
    styleContainer = {
        display: 'grid',
        gridAutoFlow: 'rows'
    },
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
                multiline={multiline}
                rows={rows}
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