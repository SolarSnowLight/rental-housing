import styles from './CompanyInfo.module.css';

import company_logo from '../../../resources/images/company_logo.svg';

const CompanyInfo = () => {
    return (
        <div className={styles['company-wrapper__header']}>
            <div className={styles['company-info__header']}>
                <div className={styles['company-info-title__header']}>
                    <img src={company_logo} />
                    <div>
                        <text className={styles['text-company-title']}>Company name</text>
                    </div>
                </div>
                <div>
                    <text className={styles['text-company-contact__header']}>website.www.com</text>
                    <text
                        className={styles['text-company-contact__header']}
                        style={{
                            marginLeft: "1em"
                        }}>+69988772</text>
                </div>
                <div className={styles['chat-btn-wrapper__header']}>
                    <button
                        className={styles['chat-btn__header']}
                    >Чат онлайн</button>
                </div>
            </div>
            <div className={styles['company-description__header']}>
                <text className={styles['text-company-description']}>
                    Группа Аквилон - одна из ведущих девелоперских компаний, предоставляющих полный спектр услуг на рынке недвижимости, создана в Архангельске 13 октября 2003 года, более 18 лет на рынке.
                    Входит в ТОП-20 крупнейших застройщиков страны, в 10-ку крупнейших застройщиков Санкт-Петербурга.
                    Группа Аквилон признана системообразующим предприятием России.
                    География присутствия: Москва, Санкт-Петербург, Ленинградская область, Архангельск, Северодвинск.
                </text>
            </div>
        </div>
    )
}

export default CompanyInfo;