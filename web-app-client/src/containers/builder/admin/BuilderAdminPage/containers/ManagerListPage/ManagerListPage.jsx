import styles from './ManagerListPage.module.css';

import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ListItemComponent from '../../components/ListItemComponent';

const ManagerListPage = () => {
    return (
        <div className={styles["list"]}>
            <div className={styles["list-header"]}>
                <div className={styles["list-header__item__left"]}>
                    <span className={styles["text-h3"]}>Менеджеры</span>
                </div>
                <div className={styles["list-header__item__right"]}>
                    <ButtonWhiteComponent
                        title={"Добавить менеджера"}
                    />
                </div>
            </div>
            <div className={styles["list-body"]}>
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
                <ListItemComponent column1='Алексей Алексеевич Алексеев' column2='324 проекта,' column3='12123 клиентов' />
            </div>
            <div className={styles["list-footer"]}>
                <div>
                    <span className={"span__text__black-h4"}>Показать ещё</span>
                </div>
            </div>
        </div>
    )
}

export default ManagerListPage;