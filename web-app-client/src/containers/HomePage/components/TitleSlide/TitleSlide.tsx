import React, {useState} from "react";
import css from './TitleSlide.module.scss'
import styled from "styled-components";
import {Button, MenuItem, Select} from "@mui/material";
import Space from "src/components/Space";
import { root } from "src/styles";
import {toast} from "react-toastify";
import ArrowUpRightIc from "src/components/icons/ArrowUpRightIc";
import {LogoIc} from "src/components/icons";
import {ArrowDownIc} from "src/components/icons";
// @ts-ignore
import mainVideo from 'src/resources/videos/main-video.mp4'




const allRealEstateTypes = [{ value: 'flat', name: 'Квартира'},{ value: 'house', name: 'Дом' }]
const allRoomsTitle = [
    { value: 1, name: '1 комн.' },{ value: 2, name: '2 комн.' },
    { value: 3, name: '3 комн.' },{ value: 4, name: '4 комн.' },
]
const allPricesTitle = [
    { value: 5000000, name: 'от 5 млн.' },{ value: 50000000, name: 'от 50 млн.' },
    { value: 100000000, name: 'от 100 млн.' },
]




const TitleSlide = () => {



    const [realEstateType, setRealEstateType] = useState(allRealEstateTypes.find(it=>it.value==='flat'))
    const onRealEstateType = (ev) => {
        setRealEstateType(ev.target.value)
    }

    const [roomsTitle, setRoomsTitle] = useState(allRoomsTitle.find(it=>it.value===1))
    const onRoomsTitle = (ev) => {
        setRoomsTitle(ev.target.value)
    }

    const [priceTitle, setPriceTitle] = useState(allPricesTitle.find(it=>it.value===5000000))
    const onPriceTitle = (ev) => {
        setPriceTitle(ev.target.value)
    }



    const onTitleSearch = () => {
        toast.info('Применить фильтр')
    }


    return <div className={css.titleSlide}>

        <video src={mainVideo} autoPlay loop/>

        <div className={css.blackTransparent}/>

        <div className={css.grid}>

            <div className={css.logo}>
                <LogoIc width={64} mainColor={'#FCFCFC'} />
            </div>

            <div className={css.empty}/>

            <div className={css.search}>
                <div className={css.title}>Хватит сёрфить.<br/>Найди тут и успокойся</div>
                <Space h={16}/>
                <div className={css.subtitle}>Поиск недвижимости в Сочи</div>
                <Space h={54}/>
                <div className={css.filters}>
                    <SelectTitle
                        value={realEstateType}
                        onChange={onRealEstateType}
                    >
                        {
                            // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                            // @ts-ignore
                            allRealEstateTypes.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                        }
                    </SelectTitle>
                    <SelectTitle
                        value={roomsTitle}
                        onChange={onRoomsTitle}
                    >
                        {
                            // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                            // @ts-ignore
                            allRoomsTitle.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                        }
                    </SelectTitle>
                    <SelectTitle
                        value={priceTitle}
                        onChange={onPriceTitle}
                    >
                        {
                            // в доках написано, что объект можно кидать в качестве value https://mui.com/material-ui/api/select/
                            // @ts-ignore
                            allPricesTitle.map(it=><MenuItem key={it.value} value={it}>{it.name}</MenuItem>)
                        }
                    </SelectTitle>
                    <ButtonTitle onClick={onTitleSearch}>Поиск</ButtonTitle>
                </div>
            </div>

        </div>

    </div>
}
export default React.memo(TitleSlide)




const LinkBtn = ({ title }) => {
    return <div className={css.linkBox}>
        <div className={css.linkTitle}>{title}</div>
        <div className={css.linkIcBox}>
            <ArrowUpRightIc size={45} mainColor='#FCFCFC'/>
        </div>
    </div>
}







const ArrowDownIcTitle = styled(ArrowDownIc).attrs({
    mainColor: '#F8F8F8', // icon color
})`
  height: 15px;
  &.MuiSelect-icon {
    right: 32px; // offset from right
  }
  &.MuiSelect-iconOpen { // icon state when menu is open
    transform: rotate(180deg);
  }
`
const SelectTitle = React.memo(styled(Select).attrs({
    variant: 'outlined',
    IconComponent: ArrowDownIcTitle,
})`
  width: 100%; height: 100%;
  background: none;
  backdrop-filter: blur(12px);
  background: rgba(0, 0, 0, 0.16);
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #F8F8F8;
    border-radius: 0;
    /*&:hover{
      border: 1px solid #F8F8F8;
    }*/
  }
  .MuiSelect-select {
    padding-left: 32px;
    height: 27px;
    font: 500 18px var(--font-family-text);
    letter-spacing: 0.05em;
    color: #F8F8F8;
    [data-placeholder-text] {
      color: #8B8B8B;
    }
  }
`)





const ButtonTitle = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: 100%; height: 100%;
    
    background-color: ${root.colorGreen};
    border: 1px solid #F8F8F8;
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
