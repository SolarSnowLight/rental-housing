import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import cs from 'classnames';

import styles from './BuilderAdminMenu.module.css';

import logo from '../../../resources/images/logo.svg';
import { useMediaQuery, Button, MenuItem, Menu, Fade, Box, Drawer } from '@mui/material';
import { useState } from 'react';

import { textMenuBlack } from './styles';
import SignInPage from 'src/containers/auth/SignInPage';
import SignUpPage from 'src/containers/auth/SignUpPage';
import ProfilePage from 'src/containers/client/ProfilePage';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux.hook';
import { authSlice } from '../../../store/reducers/AuthSlice';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import BuilderAdminMenuItem from 'src/constants/menu/builder.admin.menu-item';

const BuilderAdminMenu = () => {
    const auth = useAppSelector((state) => state.authReducer);
    const authActions = authSlice.actions;
    const dispatch = useAppDispatch();
    const [currentPoint, setCurrentPoint] = useState(BuilderAdminMenuItem.company);

    const matches = useMediaQuery('(min-width: 850px)');
    const [stateCurrentPage, setStateCurrentPage] = useState({
        "value": "sign-in"
    });

    const navigate = useNavigate();

    const toCompany = () => {
        setCurrentPoint(BuilderAdminMenuItem.company);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.company);
    }

    const toManagerList = () => {
        setCurrentPoint(BuilderAdminMenuItem.managers);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.manager_list);
    }

    const toProjectList = () => {
        setCurrentPoint(BuilderAdminMenuItem.projects);
        navigate(BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_list);
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
        <>
            {
                matches && (
                    <>
                        <div className={styles["nav-menu-center__header"]}>
                            <div
                                className={(currentPoint === BuilderAdminMenuItem.company ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
                            >
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toCompany}
                                >{BuilderAdminMenuItem.company}</span>
                            </div>
                            <div
                                className={(currentPoint === BuilderAdminMenuItem.projects ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
                            >
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toProjectList}
                                >{BuilderAdminMenuItem.projects}</span>
                            </div>
                            <div
                                className={(currentPoint === BuilderAdminMenuItem.managers ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
                            >
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toManagerList}
                                >{BuilderAdminMenuItem.managers}</span>
                            </div>
                            <div
                                className={(currentPoint === BuilderAdminMenuItem.messenger ? styles["nav-menu__element__select"] : styles["nav-menu__element"])}
                            >
                                <span
                                    className={styles["text-menu--black"]}
                                    onClick={toManagerList}
                                >{BuilderAdminMenuItem.messenger}</span>
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
        </>
    )
}

export default BuilderAdminMenu;