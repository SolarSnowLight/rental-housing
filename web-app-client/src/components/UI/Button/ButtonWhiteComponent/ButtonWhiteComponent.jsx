/* Libraries */
import { Button } from '@mui/material';

/* Styles */
import { root, textStyleDefault } from 'src/styles';

const ButtonWhiteComponent = ({ title, style = { width: '15em', height: '3.688em' }, clickHandler = (e) => { }, type = "button", variant = "container" }) => {
    return (
        <>
            <Button
                type={type}
                variant={variant}
                onClick={(e) => {
                    clickHandler(e);
                }}
                sx={{
                    backgroundColor: root.colorWhite,
                    fontSize: '14px !important',
                    borderRadius: '0px !important',
                    border: '1px solid #424041 !important',
                    ...style,
                    ...textStyleDefault,
                    ":hover": {
                        backgroundColor: root.colorWhite,
                        fontSize: '14px !important',
                        borderRadius: '0px !important',
                        border: '1px solid #424041 !important',
                        ...style,
                        ...textStyleDefault,
                    }
                }}>{title}</Button>
        </>
    )
}

export default ButtonWhiteComponent;