import css from './MainPage.module.scss'
import mainBgcImage from '../../resources/images/main-page-bgc.jpg'
import React from 'react'
import LogoIc from "../../components/icons/LogoIc";
import Space from "../../components/icons/Space";
import ArrowDownIc from "../../components/icons/ArrowDownIc";
import ArrowUpRightIc from "../../components/icons/ArrowUpRightIc";


const MainPage = () => {


    return <div className={css.mainPage}>

        <div className={css.testFrame}>
            <div className={css.test1}>

            </div>
            <div className={css.test2}>
                <div className={css.test2Titles}>
                    <div className={css.title}>Хватит сёрфить.</div>
                    <div className={css.title}>Найди тут и успокойся</div>
                </div>
            </div>
            <div className={css.test3}>

            </div>
        </div>



        {/*<div className={css.firstFrame}>
            <div className={css.bgcImage} style={{ backgroundImage: `url(${mainBgcImage})` }}/>
            <div className={css.bgcColor}/>
            <div className={css.horizontalLine}/>
            <div className={css.verticalLine}/>
            <div className={css.logoBox}>
                <LogoIc mainColor='#FCFCFC'/>
            </div>
            <div className={css.titleContainer}>
                <div className={css.title}>Хватит сёрфить.</div>
                <div className={css.title}>Найди тут и успокойся</div>
                <Space h={16}/>
                <div className={css.subtitle}>Поиск недвижимости в Сочи</div>
                <Space h={88}/>
                <div className={css.row}>
                    <SelectMenuBtn title='Квартира' className={css.start}/>
                    <SelectMenuBtn title='1 комн.' className={css.middle}/>
                    <SelectMenuBtn title='от 5 млн.' className={css.middle}/>
                    <SelectBtn title='Поиск' style={{ width: 315 }} className={css.end}/>
                </div>
            </div>
            <div className={css.linksContainer}>
                <LinkBtn title='Популярное'/>
                <LinkBtn title='Профиль'/>
                <LinkBtn title='Застройщики'/>
                <LinkBtn title='Связь с нами'/>
            </div>
        </div>*/}

        {/*<div className={css.secondFrame}>
            <div className={css.secondContainer}>
                <div className={css.secondBox}>
                    <div className={css.secondTitle}>18 компаний</div>
                    <div className={css.secondText}>Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.</div>
                </div>
                <div className={css.secondBox}>
                    <div className={css.secondTitle}>165 квартир</div>
                    <div className={css.secondText}>Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи. Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.</div>
                </div>
                <div className={css.secondBox}>
                    <div className={css.secondTitle}>58 частных домов</div>
                    <div className={css.secondText}>Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.</div>
                </div>
            </div>
        </div>*/}
    </div>
}
export default React.memo(MainPage)


const SelectMenuBtn = React.memo(({ title, className }) => {
    return <div className={css.selectMenuButton+' '+className}>
        <div className={css.selectMenuButtonTitle}>{title}</div>
        <div className={css.selectMenuButtonIcBox}>
            <ArrowDownIc mainColor='#F8F8F8' style={{width: 28, maxWidth: undefined}}/>
        </div>
    </div>
})



const SelectBtn = React.memo(({ title, style, className }) => {
    return <button className={css.selectBtn+' '+className} style={style}>
        {title}
    </button>
})


const LinkBtn = ({ title }) => {
    return <div className={css.linkBox}>
        <div className={css.linkTitle}>{title}</div>
        <div className={css.linkIcBox}>
            <ArrowUpRightIc size={45} mainColor='#FCFCFC'/>
        </div>
    </div>
}