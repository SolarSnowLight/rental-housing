import { useNavigate } from 'react-router-dom';
import cs from 'classnames';

import styles from './Navbar.module.css';

import logo from '../../resources/images/logo.svg';
import { useMediaQuery, Button, MenuItem, Menu, Fade } from '@mui/material';
import { useState } from 'react';

const Navbar = () => {
    const matches = useMediaQuery('(min-width: 850px)');

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
                                    onClick={toBuilder}
                                >Застройщики</span>
                            </div>
                            <div>
                                <span className={styles["text-menu--black"]}>Связь с нами</span>
                            </div>
                        </div>
                        <div className={styles["nav-block__header"]}>
                            <span className={styles["text-menu--black"]}>Приступить к поиску</span>
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
                                    ...styles['text-menu--black'],
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