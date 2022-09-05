import styles from './ProfilePage.module.css';

import { root } from '../../styles';
import { textStyleDefault } from '../../styles';

import { Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { authSlice } from '../../store/reducers/AuthSlice';
import CircularIndeterminate from '../../components/CircularIndeterminate';
import { useEffect } from 'react';
import { useMessageToastify } from '../../hooks/message.toastify.hook';
import { authLogout } from 'src/store/actions/AuthAction';

const ProfilePage = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();

    const message = useMessageToastify();

    /*console.log(auth);
    useEffect((auth) => {
        if(!auth.isAuthenticated){
            message("Выход выполнен успешно!", "success");
        }

    }, [auth.isAuthenticated]);*/

    return (
        <div>
            {
                auth.isLoading && <CircularIndeterminate />
            }

            <Button
                variant="contained"
                fullWidth={true}
                disableElevation={true}
                onClick={() => {
                    (async () => {
                        dispatch(authLogout(auth.access_token));
                    })();
                }}
                sx={{
                    backgroundColor: root.colorGreen,
                    fontSize: '14px !important',
                    borderRadius: '0px !important',
                    border: '1px solid #424041 !important',
                    width: '100%',
                    height: '3em',
                    ...textStyleDefault,
                    ":hover": {
                        backgroundColor: root.colorGreen,
                        fontSize: '14px !important',
                        borderRadius: '0px !important',
                        border: '1px solid #424041 !important',
                        width: '100%',
                        height: '3em',
                        ...textStyleDefault,
                    }
                }}
            >
                Выход
            </Button>
        </div>
    )
}

export default ProfilePage;