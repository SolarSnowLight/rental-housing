import css from './ObjectSearchPage.module.scss';
import Space from "src/components/Space/Space";
import React, { useState } from "react";
import RowSelect from "src/components/RowSelect";
import {toast} from "react-toastify";
import { Select, MenuItem } from "@mui/material";
import styled from "styled-components";
import { ArrowDownIc } from 'src/components/icons';



const allRooms = ['1','2','3','4+']
const allSorts = ['Стоимость', 'Дата']
let costFromDefault
const allCostsFrom = [costFromDefault = { name: 'от 2млн', value: 2000000 }, { name: 'от 4млн', value: 4000000 }]
const allCostsTo = [{ name: 'до 10млн', value: 10000000 }, { name: 'до 100млн', value: 100000000 }]


//const aaaa = [{ name: 'от 2млн', value: 2000000 }, { name: 'от 4млн', value: 4000000 }]
//console.log('find',aaaa.find(it=>it.value===2000000))


const ObjectSearchPage = () => {

    const [selectedRooms, setSelectedRooms] = useState(['1'])
    const onRoomSelect = (item, isSelected, index) => {
        if (!isSelected) setSelectedRooms([...selectedRooms, item])
        else setSelectedRooms(selectedRooms.filter(it=>it!==item))
    }

    const [sort, setSort] = useState("")
    const onSort = (ev) => {
        setSort(ev.target.value)
    }

    const [costFrom, setCostFrom] = useState(allCostsFrom.find(it=>it.value===2000000)!)
    const onCostFrom = (ev) => {
        setCostFrom(ev.target.value)
    }

    const [costTo, setCostTo] = useState(allCostsTo.find(it=>it.value===100000000)!)
    const onCostTo = (ev) => {
        setCostTo(ev.target.value)
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
                        <div className={css.row}>
                            <Select1
                                sx={{ width: '169px' }}
                                value={costFrom}
                                onChange={onCostFrom}
                                IconComponent={ArrowDownIc1}
                            >
                                {
                                    // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                                    // @ts-ignore
                                    allCostsFrom.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                                }
                            </Select1>
                            <Select1
                                sx={{ width: '194px', marginLeft: '-1px' }}
                                value={costTo}
                                onChange={onCostTo}
                                IconComponent={ArrowDownIc1}
                            >
                                {
                                    // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                                    // @ts-ignore
                                    allCostsTo.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                                }
                            </Select1>
                        </div>
                    </div>

                    <div className={css.widgetBox}>
                        <div className={css.title}/>
                        <Space h={8}/>
                        <Select1
                            displayEmpty
                            value={sort}
                            onChange={onSort}
                            renderValue={(selected)=>{
                                if (selected.length===0){
                                    return <span data-placeholder-text>Сортировать по</span>
                                }
                                return selected
                            }}
                            IconComponent={ArrowDownIc1}
                        >
                            <MenuItem value=""><em>По умолчанию</em></MenuItem>
                            { allSorts.map(it=><MenuItem key={it} value={it}>{it}</MenuItem>) }
                        </Select1>
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




const Select1 = React.memo(styled(Select)`
  width: 235px; height: 59px;
  background: #F8F8F8;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiSelect-select {
    padding-left: 32px;
    height: 27px;
    font: 500 18px var(--font-family-text);
    letter-spacing: 0.05em;
    color: black;
    [data-placeholder-text] {
      color: #8B8B8B;
    }
  }
`)

const ArrowDownIc1 = styled(ArrowDownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 11px;
  &.MuiSelect-icon {
    right: 32px; // offset from right
  }
  &.MuiSelect-iconOpen { // icon state when menu is open
    transform: rotate(180deg);
  }
`