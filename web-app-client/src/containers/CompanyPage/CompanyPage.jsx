import styles from './CompanyPage.module.css';

import CompanyInfo from '../../components/Company/CompanyInfo/CompanyInfo';
import MapComponent from '../../components/MapComponent';
import { useState } from 'react';
import Filter from '../../components/Filter';
import { animated, useSpring } from '@react-spring/web';

const CompanyPage = () => {
    const [filterActive, setFilterActive] = useState(false);
    const styleSpringFilter = useSpring({
        opacity: filterActive ? 1 : 0,
        y: filterActive ? 0 : -24
    });

    const styleSpringFilterText = useSpring({
        y: filterActive ? 0 : -24
    });

    return (
        <div>
            { /* Информация о компании + кнопка чата */}
            <CompanyInfo />
            <div className={styles['block-wrapper__filter']}>
                <animated.div style={styleSpringFilterText}>
                    <button
                        className={styles['text-filter']}
                        onClick={() => {
                            setFilterActive(!filterActive);
                        }}
                    >
                        {
                            (filterActive) ? "Скрыть фильтр" : "Фильтр"
                        }
                    </button>
                </animated.div>
            </div>
            {
                (filterActive) ?
                    <div className={styles['block-wrapper__filter']}>
                        <animated.div style={styleSpringFilter}>
                            <Filter/>
                        </animated.div>
                    </div>
                    : ''
            }
            <div className={styles['map-wrapper']}>
                <MapComponent />
            </div>
        </div>
    )
}

export default CompanyPage;