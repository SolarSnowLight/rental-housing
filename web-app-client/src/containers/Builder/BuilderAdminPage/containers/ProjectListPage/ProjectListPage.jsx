import styles from './ProjectListPage.module.css';

import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ListItemComponent from '../../components/ListItemComponent';
import { useNavigate } from 'react-router-dom';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';
import { useEffect, useState } from 'react';
import useHttp from 'src/hooks/http.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import ProjectApi from 'src/constants/addresses/apis/project.api';
import MainApi from 'src/constants/addresses/apis/main.api';

const ProjectListPage = () => {
    const { loading, request, error, clearError } = useHttp();
    const message = useMessageToastify();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        message(error, "error");
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        (async () => {
            const response = await request(
                ProjectApi.get_all_projects,
                'POST',
                JSON.stringify({
                    uuid: "8c5e07cb-37a9-4fa9-bbdb-0a68452608bf",
                    count: projects.length,
                    limit: 10
                })
            );

            if (response.projects) {
                setProjects(response.projects);
            }
        })();
    }, []);

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
                {
                    projects && projects?.length > 0 && projects.map((item) => {
                        return (
                            <ListItemComponent
                                column1={item.data.title}
                                img={(item.data.logo) ? MainApi.main_server + '/' + item.data.logo: null}
                            />
                        )
                    })
                }
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