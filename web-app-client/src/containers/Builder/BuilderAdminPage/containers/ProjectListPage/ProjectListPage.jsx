import styles from './ProjectListPage.module.css';

import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ListItemComponent from '../../components/ListItemComponent';
import { useNavigate } from 'react-router-dom';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';

const ProjectListPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles["list"]}>
            <div className={styles["list-header"]}>
                <div className={styles["list-header__item__left"]}>
                    <span className={styles["text-h3"]}>Проекты</span>
                </div>
                <div className={styles["list-header__item__right"]}>
                    <ButtonWhiteComponent
                        clickHandler={() => {
                            navigate(BuilderAdminRoute.builder_admin + "/" + BuilderAdminRoute.project_create);
                        }}
                        title={"Добавить проект"}
                    />
                </div>
            </div>
            <div className={styles["list-body"]}>
                <ListItemComponent column1='Проект жилстрой' column2='324 проекта,' />
                <ListItemComponent column1='Проект проект' column2='324 проекта,'/>
                <ListItemComponent column1='Проект проекта в проекте' column2='324 проекта,' />
                <ListItemComponent column1='Очень классный проект' column2='324 проекта,' />
                <ListItemComponent column1='Дайте деняк' column2='324 проекта,' />
                <ListItemComponent column1='Проект работы за еду' column2='324 проекта,' />
                <ListItemComponent column1='Проект ...' column2='324 проекта,' />
                <ListItemComponent column1='Проект жилстрой' column2='324 проекта,' />
                <ListItemComponent column1='Проект проект' column2='324 проекта,' />
                <ListItemComponent column1='Проект проекта в проекте' column2='324 проекта,' />
                <ListItemComponent column1='Очень классный проект' column2='324 проекта,' />
                <ListItemComponent column1='Проект проекта в проекте' column2='324 проекта,' />
                <ListItemComponent column1='Очень классный проект' column2='324 проекта,' />
            </div>
            <div className={styles["list-footer"]}>
                <div>
                    <span className={"span__text__black-h4"}>Показать ещё</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectListPage;