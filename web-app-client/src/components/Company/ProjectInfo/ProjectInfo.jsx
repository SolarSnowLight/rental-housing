/* Libraries */
import React from 'react';

/* Images */
import company_logo from 'src/resources/images/company_logo.svg';

/* Styles */
import styles from './ProjectInfo.module.css';


const ProjectInfo = ({
    logo = company_logo,
    company = "Имя застройщика",
    title = 'Project Name',
    description = `Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
    Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
    Группа Аквилон признана системообразующим предприятием России.
    География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.`}) => {

    return (
        <div className={styles['project-wrapper__header']}>
            <div className={styles['project-info__header']}>
                <div className={styles['project-info-title__header']}>
                    <img 
                    src={logo} 
                    className={styles["logo"]}
                    />
                    <div>
                        <div>
                            <span className={styles['text-project-title']}>{title}</span>
                        </div>
                        <div>
                            <span className={styles['text-project-contact__header']}>{company}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['project-description__header']}>
                    <span className={styles['text-project-description']}>
                        {description}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ProjectInfo);