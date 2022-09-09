import styles from './ProjectInfo.module.css';

import company_logo from '../../../resources/images/company_logo.svg';

const ProjectInfo = ({
    logo = company_logo,
    company = "Имя застройщика",
    title = 'Project Name',
    link = 'website.www.com',
    phone = '+7129856192857',
    description = `Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
    Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
    Группа Аквилон признана системообразующим предприятием России.
    География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.`}) => {

    return (
        <div className={styles['project-wrapper__header']}>
            <div className={styles['project-info__header']}>
                <div className={styles['project-info-title__header']}>
                    <img src={logo} />
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

export default ProjectInfo;