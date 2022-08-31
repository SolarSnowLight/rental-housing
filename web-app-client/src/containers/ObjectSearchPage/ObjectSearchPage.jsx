import css from './ObjectSearchPage.module.scss';
import Space from "src/components/icons/Space";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import RowSelect from "src/components/RowSelect";
import {toast} from "react-toastify";


const allRooms = ['1','2','3','4+']



const ObjectSearchPage = () => {

    const [selectedRooms, setSelectedRooms] = useState(['1'])
    const onRoomSelect = (item, isSelected, index) => {
        if (!isSelected) setSelectedRooms([...selectedRooms, item])
        else setSelectedRooms(selectedRooms.filter(it=>it!==item))
    }

    const onFilterApply = () => {
        toast.info('Эта функция ещё не реализована')
    }

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
                        <RowSelect items={allRooms} selected={selectedRooms} onSelect={onRoomSelect}/>
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
                        <button className={css.apply} onClick={onFilterApply}>Применить фильтр</button>
                    </div>



                </div>

                <Space h={56}/>

                <div style={{ background: 'aqua' }}>Карта</div>

                <Space h={56}/>

                <div style={{ background: 'aqua' }}>Карточки домов</div>

                <Space h={85}/>

            </div>
        </div>
    )
}

export default ObjectSearchPage;