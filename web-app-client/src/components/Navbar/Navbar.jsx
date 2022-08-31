import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import cs from 'classnames';

import styles from './Navbar.module.css';

import logo from '../../resources/images/logo.svg';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState } from 'react';

import { textMenuBlack } from './styles';
import SignInPage from '../../containers/AuthPage/SignInPage';
import SignUpPage from '../../containers/AuthPage/SignUpPage';
import { useAppSelector, useAppDispatch } from '../../hooks/redux.hook';
import { authSlice } from '../../store/reducers/AuthSlice';
import ProfilePage from '../../containers/ProfilePage';

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
        navigate('/home');
    }

    const toBuilder = () => {
        navigate('/builder');
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
            {
                matches && (
                    <>
                        <div className={styles["nav-menu-center__header"]}>
                            <div>
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toHome}
                                >Главная</span>
                            </div>
                            <div>
                                <span
                                    className={styles["text-menu--black"]}
                                >Поиск</span>
                            </div>
                            <div>
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toBuilder}
                                >Застройщики</span>
                            </div>
                        </div>
                        <div className={styles["nav-block__header"]}>
                            {["right"].map((anchor) => (
                                <React.Fragment key={anchor}>
                                    <Button
                                        onClick={toggleDrawer(anchor, true)}
                                        sx={{
                                            ...textMenuBlack
                                        }}
                                    >
                                        Профиль
                                    </Button>
                                    <Drawer
                                        anchor={anchor}
                                        open={state[anchor]}
                                        onClose={toggleDrawer(anchor, false)}
                                    >
                                        {list(anchor)}
                                    </Drawer>
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )
            }
            {
                (!matches) && (
                    <>
                        <div className={styles["nav-block__header"]}>
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{
                                    ...textMenuBlack
                                }}
                            >
                                Меню
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </>
                )
            }
        </nav>
    )
}

export default Navbar;