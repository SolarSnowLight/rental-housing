import css from './ObjectSearchPage.module.scss';
import Space from "../../components/icons/Space";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

const ObjectSearchPage = () => {



    return (
        <div className={css.page}>
            <div className={css.mainFrame}>

                <Space h={33}/>

                <div className={css.mainTitle}>Поиск объекта</div>

                <Space h={88}/>

                <div className={css.fieldsContainer}>

                    <div className={css.widgetBox}>
                        <div className={css.title}/>
                        <Space h={8}/>
                        <div className={css.search}>search</div>
                    </div>

                    <div className={css.widgetBox}>
                        <div className={css.title}>Количество комнат</div>
                        <Space h={8}/>
                        <div className={css.rooms}>rooms</div>
                    </div>

                    <div className={css.widgetBox}>
                        <div className={css.title}>Стоимость</div>
                        <Space h={8}/>
                        <div className={css.cost}>cost</div>
                    </div>

                    <div className={css.widgetBox}>
                        <div className={css.title}/>
                        <Space h={8}/>
                        <div className={css.sort}>sort</div>
                    </div>

                    <div className={css.widgetBox}>
                        <div className={css.title}/>
                        <Space h={8}/>
                        <button className={css.apply}>Применить фильтр</button>
                    </div>



                </div>

                <Space h={56}/>

                Карта

                <Space h={56}/>

                Карточки домов

                <Space h={85}/>

                <div className={css.line}/>

                <Space h={40}/>

                <div className={css.footerContainer}>

                    <div className={css.aaa}></div>

                    <div className={css.cYearBox}>
                        <div className={css.year}>© 2022</div>
                        <Space h={8}/>
                        <div className={css.text}>Текст</div>
                    </div>

                    <Space flexGrow={1}/>

                    <div className={css.navAndContactBox}>
                        <div className={css.title}>НАВИГАЦИЯ</div>
                        <Space h={32}/>
                        <div className={css.navMenuItem}>Главная</div>
                        <Space h={16}/>
                        <div className={css.navMenuItem}>Объекты</div>
                        <Space h={16}/>
                        <div className={css.navMenuItem}>Главная</div>
                        <Space h={16}/>
                        <div className={css.navMenuItem}>Застройщики</div>
                    </div>

                    <Space flexGrow={1}/>

                    <div className={css.navAndContactBox}>
                        <div className={css.title}>КОНТАКТЫ</div>
                        <Space h={32}/>
                        <div className={css.contactMenuItem}>+7895688877</div>
                        <Space h={16}/>
                        <div className={css.contactMenuItem}>gmail.ua@gmail.com</div>
                    </div>

                    <Space flexGrow={1}/>

                    <div className={css.confidentialityBox}>
                        <div className={css.text}>Политика конфиденциальности</div>
                    </div>

                </div>

                <Space h={96}/>

            </div>
        </div>
    )
}

export default ObjectSearchPage;