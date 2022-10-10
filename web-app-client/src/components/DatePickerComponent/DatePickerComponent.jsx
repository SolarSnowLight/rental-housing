/* Libraries */
import DatePicker from 'react-datepicker';
import { TextField } from '@mui/material';

/* Styles */
import styles from './DatePickerComponent.module.css';

/**
 * Component for use DatePicker
 * @param {{value, changeHandler, placeholder}} props - props for components 
 * @returns {JSX.Element}
 */
const DatePickerComponent = ({
    value = new Date(),
    changeHandler = () => { },
    placeholder = "Дата сдачи"
}) => {
    return (
        <>
            <DatePicker
                locale="ru"
                selected={value}
                onChange={changeHandler}
                customInput={
                    <TextField
                        required
                        id="outlined-required"
                        placeholder={placeholder}
                        autoComplete='off'
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
                }
            />
        </>
    )
}

export default DatePickerComponent;