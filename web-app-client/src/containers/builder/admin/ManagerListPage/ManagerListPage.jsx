import styles from './ManagerListPage.module.css';

import ButtonWhiteComponent from 'src/components/ui/buttons/ButtonWhiteComponent';
import ListItemComponent from 'src/components/ListItemComponent';
import { useAppSelector, useAppDispatch } from 'src/hooks/redux.hook';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import { useNavigate } from 'react-router-dom';
import companyAction from 'src/store/actions/CompanyAction';
import { useEffect } from "react";
import MainApi from 'src/constants/addresses/apis/main.api';
import BuilderAdminRoute from 'src/constants/addresses/routes/builder.admin.route';

const ManagerListPage = () => {
    const userSelector = useAppSelector((state) => state.userReducer);
    const companySelector = useAppSelector((state) => state.companyReducer);
    const dispatch = useAppDispatch();
    const message = useMessageToastify();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(companyAction.getAllManagersByCompany(userSelector.company?.uuid));
    }, []);

    const getProjectsHandler = () => {
        dispatch(companyAction.getAllManagersByCompany(
            userSelector.company?.uuid,
            true,
            companySelector.managers.length
        ));
    };

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
                {
                    companySelector.managers && companySelector.managers?.length > 0 && companySelector.managers.map((item) => {
                        if (!item) {
                            return (<></>);
                        }
                        return (
                            <ListItemComponent
                                column1={item.data.name}
                                img={(item.data.avatar) ? MainApi.main_server + '/' + item.data.avatar.replace('\\', '/') : null}
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

export default ManagerListPage;