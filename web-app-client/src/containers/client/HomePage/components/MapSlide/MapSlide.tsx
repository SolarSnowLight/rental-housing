import React, {useState} from "react";
import css from './MapSlide.module.scss'
import styled from "styled-components";
import {Autocomplete, Button, IconButton, InputAdornment, MenuItem, Select, TextField} from "@mui/material";
import Space from "src/components/Space";
import { root } from "src/styles";
import MapComponent from "src/components/MapComponent";
import {toast} from "react-toastify";
import RowSelect from "src/components/RowSelect";
import { SearchIc } from "src/components/icons";
import { ArrowDownIc } from "src/components/icons";
import Filter2 from "src/components/Filter/Filter";



const searchVariants = [{value: 'Иркутск'}, {value: 'Анграск'}]
const allRooms = ['1','2','3','4+']
const allCostsFrom = [{ name: 'от 2млн', value: 2000000 }, { name: 'от 4млн', value: 4000000 }]
const allCostsTo = [{ name: 'до 10млн', value: 10000000 }, { name: 'до 100млн', value: 100000000 }]
const allSorts = ['Стоимость', 'Дата']


const MapSlide = () => {


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


    return <div className={css.mapSlide}>

        <div className={css.title}>На карте</div>

        <Space h={59}/>

        <Filter2 />

        <Space h={24}/>

        <div className={css.mapBox}>
            <MapComponent style={{ width: '100%', height: '100%' }}/>
        </div>

    </div>
}
export default React.memo(MapSlide)





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