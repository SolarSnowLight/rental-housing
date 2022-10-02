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
import apiMainServer from 'src/http/http.main-server';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux.hook';
import companyAction from 'src/store/actions/CompanyAction';

const ProjectListPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const companySelector = useAppSelector((state) => state.companyReducer);
    const dispatch = useAppDispatch();
    const message = useMessageToastify();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(companyAction.getAllProjectsByCompany(userSelector.company?.uuid));
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
                    companySelector.projects && companySelector.projects?.length > 0 && companySelector.projects.map((item) => {
                        return (
                            <ListItemComponent
                                column1={item.data.title}
                                img={(item.data.logo) ? MainApi.main_server + '/' + item.data.logo : null}
                                clickHandler={() => {
                                    navigate(
                                        (BuilderAdminRoute.builder_admin + '/' + BuilderAdminRoute.project_info),
                                        {
                                            state: {
                                                ...item
                                            }
                                        }
                                    );
                                }}
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