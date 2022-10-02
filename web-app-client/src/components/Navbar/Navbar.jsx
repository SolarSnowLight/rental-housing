import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import cs from 'classnames';

import styles from './Navbar.module.css';

import logo from '../../resources/images/logo.svg';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState } from 'react';

import { textMenuBlack } from './styles';
import SignInPage from '../../containers/auth/SignInPage';
import SignUpPage from '../../containers/auth/SignUpPage';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { authSlice } from '../../store/reducers/AuthSlice';
import ProfilePage from '../../containers/client/ProfilePage';

import ClientMenu from './ClientMenu';
import AdminMenu from './AdminMenu';
import BuilderAdminMenu from './BuilderAdminMenu';

const Navbar = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();

    const matches = useMediaQuery('(min-width: 850px)');
    const [stateCurrentPage, setStateCurrentPage] = useState({
        "value": "sign-in"
    });

    const navigate = useNavigate();

    const toHome = () => {
        navigate('/company');
    }

    const toBuilder = () => {
        navigate('/admin');
    }

    const toSearch = () => {
        navigate('/object-search');
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Drawer
    const [state, setState] = useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const currentPageSwitcher = (state) => {
        switch (state.value) {
            case "sign-in": {
                return <SignInPage setStateCurrentPage={setStateCurrentPage} />
            }
            case "sign-up": {
                return <SignUpPage setStateCurrentPage={setStateCurrentPage} />
            }
        }
    }

    const list = (anchor) => {
        /*if(auth.isAuthenticated){
            setStateCurrentPage('sign-in');
        }*/

        return (
            <Box
                sx={{ width: "29em" }}
                role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
            >
                {
                    (!auth.isAuthenticated) && currentPageSwitcher(stateCurrentPage)
                }
                {
                    (auth.isAuthenticated) && <ProfilePage />
                }
            </Box>
        );
    };

    return (
        <nav className={cs(styles["nav__header"], styles["nav-menu__header"])}>
            <div className={styles['nav-logo__header']}>
                <img src={logo} />
            </div>
            <BuilderAdminMenu />
        </nav>
    )
}

export default Navbar;