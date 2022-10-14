/* Libraries */
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

/* Styles */
import styles from './TextFieldControlComponent.module.css';

const TextFieldControlComponent = ({
    title = "Текст *",
    placeholder = "Описание",
    changeHandler = () => { },
    required = false,
    control,
    errors,
    defaultValue,
    name,
    multiline = false,
    rows = 1,
    rules = null,
    View = TextField
}) => {
    return (
        <div
            className={styles["wrapper"]}
        >
            <span className='span__text__gray'>{title}</span>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field }) => (
                    <View
                        required={required}
                        multiline={multiline}
                        rows={rows}
                        placeholder={placeholder}
                        onChange={(e) => {
                            field.onChange(e);
                            changeHandler(name, (e?.target?.value)? e.target.value : e);
                        }}
                        value={field.value}
                        error={!!errors[name]?.message}
                        helperText={!!errors[name]?.message}

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
                )}
            />
        </div>
    )
}

export default TextFieldControlComponent;