import styles from './ManagerListPage.module.css';

import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ListItemComponent from '../components/ListItemComponent';

const ManagerListPage = () => {
    return (
        <div className={styles["list"]}>
            <div className={styles["list-header"]}>
                <div className={styles["list-header__item__left"]}>
                    <span className={styles["text-h3"]}>Менеджеры</span>
                </div>
                <div className={styles["list-header__item__right"]}>
                    <ButtonWhiteComponent title={"Сохранить изменения"} />
                </div>
            </div>
            <div className={styles["list-body"]}>
                <ListItemComponent column1='ФИО' column2='2 проекта,' column3='12 клиентов' />
                <ListItemComponent column1='ФИО' column2='2 проекта,' column3='12 клиентов' />
                <ListItemComponent column1='ФИО' column2='2 проекта,' column3='12 клиентов' />
                <ListItemComponent column1='ФИО' column2='2 проекта,' column3='12 клиентов' />
            </div>
        </div>
    )
}

export default ManagerListPage;