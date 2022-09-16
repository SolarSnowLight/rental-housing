import React from "react";
import css from './ObjectInfoPage.module.scss'
import FlatsTable, {Flat, Floor} from "./components/FlatsTable/FlatsTable";
import Space from "src/components/Space";
import InfoItem from "./components/InfoItem";
import imagePlaceholder from 'src/resources/images/image-placeholder.png'


const floors: Floor[] = [
    { number: 1, firstFlatNumber: 1, lastFlatNumber: 5 },
    { number: 2, firstFlatNumber: 6, lastFlatNumber: 9 },
    { number: 3, firstFlatNumber: 10, lastFlatNumber: 19 },
    { number: 4, firstFlatNumber: 20, lastFlatNumber: 31 },
]
const flats: Flat[] = [
    { number: 1, floor: 1, state: 'free' },
    { number: 2, floor: 1, state: 'promotions' },
    { number: 3, floor: 1, state: 'reserve' },
    { number: 4, floor: 1, state: 'sold' },
    { number: 5, floor: 1, state: 'na' },

    { number: 6, floor: 2, state: 'free' },
    { number: 7, floor: 2, state: 'promotions' },
    { number: 8, floor: 2, state: 'reserve' },
    { number: 9, floor: 2, state: 'sold' },
    { number: 10, floor: 2, state: 'na' },

    { number: 11, floor: 3, state: 'free' },
    { number: 12, floor: 3, state: 'promotions' },
    { number: 13, floor: 3, state: 'reserve' },
    { number: 14, floor: 3, state: 'sold' },
    { number: 15, floor: 3, state: 'na' },
    { number: 19, floor: 3, state: 'free' },

    { number: 22, floor: 4, state: 'free' },
    { number: 23, floor: 4, state: 'promotions' },
    { number: 27, floor: 4, state: 'reserve' },
]

const photos = [imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder,imagePlaceholder]

const ObjectInfoPage = () => {
    return <div className={css.page}>
        <div className={css.mainFrame}>

            <Space h={64}/>

            <div className={css.pageTopContainer}>
                <div className={css.photosContainer}>

                    <div className={css.objectName}>Название объекта</div>

                    <Space h={8}/>

                    <div className={css.developer}>
                        <div className={css.name}>Название застройщика</div>
                        <div className={css.address}>Сочи, ул. Яна Фабрициуса, 33</div>
                    </div>

                    <Space h={34}/>

                    { photos.length>0 && <div className={css.bigPhotos}>
                        { photos.slice(0,2).map(it=>
                            <div className={css.photo} style={{ backgroundImage: `url(${it})`}} />
                        ) }
                    </div>}
                    { photos.length>2 && <div className={css.smallPhotos}>
                        { photos.slice(2,4).map(it=>
                            <div className={css.photo} style={{ backgroundImage: `url(${it})`}} />
                        ) }
                        { photos[4] && <div className={css.restCounterBox}>
                            <div className={css.photo} style={{ backgroundImage: `url(${photos[4]})`}} />
                            { photos.length>5 && <div className={css.count}>+{photos.length-4}</div> }
                        </div> }
                    </div> }

                </div>
                <div className={css.infoContainer}>
                    <InfoItem title={'Срок сдачи'} items={['Март 2023 года']}/>
                    <InfoItem title={'Оплата'} items={['ДКП','Ипотека','Рассрочка: 70% первый взнос, 30% на 3 месяца']}/>
                    <InfoItem title={'Характеристики'} items={['Бизнес-класс','Управляющая компания','Закрытая охраняемая территория','1,5 км до моря','Черновая отделка','Вид на горы, море, парк, атриум']}/>
                    <InfoItem title={'Коммуникации'} items={['Центральное отопление','Водоснабжение и канализация','Электричество']}/>
                </div>
            </div>

            <Space h={106}/>

            <div className={css.tablesTitle}>Таблица квартир</div>

            <Space h={24}/>

            <div className={css.legend}>
                <div className={css.item}>
                    <div className={css.color} style={{ background: '#B4EFA6' }}/>
                    <div className={css.name}>Свободные</div>
                </div>
                <div className={css.item}>
                    <div className={css.color} style={{ background: '#EFA6A6' }}/>
                    <div className={css.name}>Акции</div>
                </div>
                <div className={css.item}>
                    <div className={css.color} style={{ background: '#A6E2EF' }}/>
                    <div className={css.name}>Резерв</div>
                </div>
                <div className={css.item}>
                    <div className={css.color} style={{ background: '#FCFCFC' }}/>
                    <div className={css.name}>Проданные</div>
                </div>
                <div className={css.item}>
                    <div className={css.color} style={{ background: '#e9e9e9' }}/>
                    <div className={css.name}>Недоступны</div>
                </div>
            </div>

            <Space h={24}/>

            <div className={css.flats}>
                <FlatsTable floors={floors} flats={flats}/>
                <FlatsTable floors={floors} flats={flats}/>
                <FlatsTable floors={floors} flats={flats}/>
                <FlatsTable floors={floors} flats={flats}/>
                <FlatsTable floors={floors.filter(it=>it.number===4)} flats={flats}/>
            </div>

        </div>
    </div>
}
export default React.memo(ObjectInfoPage)