import { useNavigate } from 'react-router-dom';
import cs from 'classnames';
import styles from './Navbar.module.css';

import logo from '../../resources/images/logo.svg';

const Navbar = () => {
    const navigate = useNavigate();

    const toHome = () => {
        navigate('/home');
    }

    const toBuilder = () => {
        navigate('/builder');
    }

    return (
        <nav className={cs(styles["nav__header"], styles["nav-menu__header"])}>
            <div className={styles['nav-logo__header']}>
                <img src={logo} />
            </div>
            <div className={styles["nav-menu-center__header"]}>
                <div>
                    <text
                        className={styles["text-menu--black"]}
                        onClick={toHome}
                    >Главная</text>
                </div>
                <div>
                    <text
                        className={styles["text-menu--black"]}
                        onClick={toBuilder}
                    >Застройщики</text>
                </div>
                <div>
                    <text className={styles["text-menu--black"]}>Связь с нами</text>
                </div>
            </div>
            <div className={styles["nav-block__header"]}>
                <text className={styles["text-menu--black"]}>Приступить к поиску</text>
            </div>
        </nav>
    )
}

export default Navbar;