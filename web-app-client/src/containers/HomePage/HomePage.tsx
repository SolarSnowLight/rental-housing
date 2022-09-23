import css from './HomePage.module.scss';
import React, {useState} from "react";
// @ts-ignore
import mainVideo from 'src/resources/videos/main-video.mp4'
import {LogoIc, SearchIc} from "src/components/icons";
import styled from "styled-components";
import {Autocomplete, Button, IconButton, InputAdornment, MenuItem, Select, TextField} from "@mui/material";
import {Arrow2ForwardIc} from "src/components/icons";
import { root } from 'src/styles';
import Space from "src/components/Space";
import ObjectCard from 'src/components/ObjectCard';
import {toast} from "react-toastify";
import RowSelect from "src/components/RowSelect";
import {ArrowDownIc} from "src/components/icons";
import MapComponent from 'src/components/MapComponent';
import ListItem from "../../components/ClientListItem/ClientListItem";

import logoDefault from 'src/resources/images/logo-default.png'
import buildingExample1 from 'src/resources/images/building-example-1.webp'
import buildingExample2 from 'src/resources/images/building-exapmle-2.webp'
import buildingExample3 from 'src/resources/images/building-example-3.jpg'
import avaDefault from 'src/resources/images/ava-default.jpg'



const buildings = [
    {
        id: 1,
        developerCompanyLogo: logoDefault,
        images: [buildingExample1,buildingExample2,buildingExample3],
        projectName: 'Проект 1',
        year: 2025,
        developer: 'Застройщик 1',
        address: 'ул. Мира 15, 76',
        square: 50,
        price: 10,
    },
    {
        id: 2,
        developerCompanyLogo: logoDefault,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 3,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 4,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 5,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
    {
        id: 6,
        projectName: 'Название проекта',
        year: 2023,
        developer: 'Застройщик',
        address: 'ул. Мира 15, 76',
        square: 42,
        price: 5,
    },
]
const searchVariants = [{value: 'Иркутск'}, {value: 'Анграск'}]
const allRooms = ['1','2','3','4+']
const allSorts = ['Стоимость', 'Дата']
const allCostsFrom = [{ name: 'от 2млн', value: 2000000 }, { name: 'от 4млн', value: 4000000 }]
const allCostsTo = [{ name: 'до 10млн', value: 10000000 }, { name: 'до 100млн', value: 100000000 }]
const clients = [
    {
        id: 1,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectsCnt: 12,
    },
    {
        id: 2,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectsCnt: 12,
    },
    {
        id: 3,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectsCnt: 12,
    },
    {
        id: 4,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectsCnt: 12,
    },
    {
        id: 5,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectsCnt: 12,
    },
]







const HomePage = () => {

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
        toast.info('Применить фильтр')
    }
    const onShowAll = () => {
        toast.info('Показать всё')
    }
    const onOpenAll = () => {
        toast.info('Открыть всё')
    }


    return <div className={css.page}>
        <div className={css.pageFrame}>


            <div className={css.firstSlide}>

                <video src={mainVideo} autoPlay loop/>

                <div className={css.blackTransparent}/>

                <div className={css.grid}>
                    <div className={css.logo}>
                        <LogoIc width={64} mainColor={'#FCFCFC'} />
                    </div>
                    <div className={css.empty}/>
                </div>

            </div>


            <div className={css.secondSlide}>

                <div className={css.item}>
                    <div className={css.title}>18 компаний</div>
                    <div className={css.text}>
                        Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
                    </div>
                </div>

                <div className={css.item}>
                    <div className={css.title}>165 квартир</div>
                    <div className={css.text}>
                        Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
                        Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
                    </div>
                </div>

                <div className={css.item}>
                    <div className={css.title}>58 частных домов</div>
                    <div className={css.text}>
                        Каталог застройщиков включает строительные организаций, которые возводят новостройки в Сочи.
                    </div>
                </div>

            </div>


            <div className={css.objectsSlide}>

                <div className={css.titleBox}>
                    <div className={css.title}>Лучшие предложения</div>
                    <div className={css.buttons}>
                        <ArrowButton>
                            <Arrow2ForwardIc style={{ transform: 'rotate(180deg)' }} />
                        </ArrowButton>
                        <ArrowButton sx={{ '&.MuiButtonBase-root': { marginLeft: '-1px' } }} >
                            <Arrow2ForwardIc />
                        </ArrowButton>
                    </div>
                </div>

                <Space h={25}/>

                <div className={css.objectsContainer}>
                    <div className={css.objectsBox}>
                        { buildings.map(it=><ObjectCard key={it.id} building={it} />) }
                    </div>
                </div>

            </div>


            <div className={css.mapSlide}>

                <div className={css.title}>На карте</div>

                <Space h={59}/>

                <div className={css.mapFilters}>

                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={searchVariants.map(it=>it.value)}
                        renderInput={(params)=><SearchInput1
                            {...params}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />}
                    />

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
                            >
                                {
                                    // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                                    // @ts-ignore
                                    allCostsFrom.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                                }
                            </Select1>
                            <Select1
                                sx={{ width: '193px', marginLeft: '-1px' }}
                                value={costTo}
                                onChange={onCostTo}
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
                        >
                            <MenuItem value=""><em>По умолчанию</em></MenuItem>
                            { allSorts.map(it=><MenuItem key={it} value={it}>{it}</MenuItem>) }
                        </Select1>
                    </div>

                    <Button1 onClick={onFilterApply}>Применить фильтр</Button1>

                    <Button1White onClick={onShowAll}>Показать всё</Button1White>

                </div>

                <Space h={24}/>

                <div className={css.mapBox}>
                    <MapComponent style={{ width: '100%', height: '100%' }}/>
                </div>

            </div>


            <div className={css.developersSlide}>

                <div className={css.title}>Застройщики</div>

                <Space h={24}/>

                <div className={css.list}>
                    { clients.map(it=><ListItem key={it.id} client={it} />) }
                </div>

                <Space h={24}/>

                <div className={css.openAll} onClick={onOpenAll}>Открыть всё</div>

            </div>


        </div>
    </div>
}
export default React.memo(HomePage);





const ArrowButton = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: 32px; height: 32px;
    min-width: 32px; min-height: 32px;
    padding: 6.5px;

    background-color: #F8F8F8;
    border: 1px solid black;
    border-radius: 0;

    :hover {
      background-color: ${root.colorGreen};
    }
  }
`)




const SearchInput1 = React.memo(styled(TextField).attrs(p=>({
    variant: "outlined",
    type: 'text',
    placeholder: "Введите название ЖК или адрес",
    InputProps: {
        ...p.InputProps,
        endAdornment: <InputAdornment position="end">
            <IconButton
                onClick={()=>console.log('search clicked!')}
            >
                <SearchIc mainColor='black' size={24}/>
            </IconButton>
        </InputAdornment>
    },
}))`
  fieldset { // рамка
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiInputBase-root.MuiOutlinedInput-root { // input container
    width: 381px; height: 59px;
    padding-right: 0;
    padding-left: 0;
  }
  .MuiInputBase-input.MuiOutlinedInput-input.MuiAutocomplete-input  { // input
    padding-left: 32px;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    &input::placeholder {
      color: #8B8B8B;
    }
  }
  .MuiInputAdornment-root {
    width: fit-content; height: fit-content;
    .MuiButtonBase-root {
      width: fit-content; height: fit-content;
      margin-right: calc(32px - 8px);
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
const Select1 = React.memo(styled(Select).attrs({
    variant: 'outlined',
    IconComponent: ArrowDownIc1,
})`
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



const Button1 = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: 280px; height: 59px;
    
    background-color: ${root.colorGreen};
    border: 1px solid #424041;
    border-radius: 0;
    
    text-transform: none;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    
    :hover {
      background-color: ${root.colorGreen};
    }
  }
`)

const Button1White = React.memo(styled(Button1)`
  &.MuiButtonBase-root {
    width: 177px;
    background-color: #F8F8F8;
    :hover {
      background-color: #F8F8F8;
    }
  }
`)


