import React, {useEffect, useState} from "react";
import css from './BuilderStatisticsPage.module.scss'
import Space from "src/components/Space";
import {Button, MenuItem, Select} from "@mui/material";
import styled from "styled-components";
import {Arrow1DownIc} from "src/components/icons";
import { root } from "src/styles";
import { toast } from "react-toastify";
import ListItem from "src/components/PersonListItem/PersonListItem";

import avaDefault from 'src/resources/images/ava-default.jpg'
import PieDiagram, {FullData} from "./components/PieDiagram/PieDiagram";
import ProjectsSelect from "./components/ProjectsSelect/ProjectsSelect";




const diagramData = [
    {
        id: "initiated deals",
        label: "Начатые сделки",
        value: 250,
        color: "#8B8B8B",
        arcLabelColor: '#A6E2EF',
        borderColor: '#8B8B8B',
    },
    {
        id: "completed deals",
        label: "Завершённые сделки",
        value: 300,
        color: "#A6E2EF",
        arcLabelColor: '#FCFCFC',
        borderColor: 'black',
    },
    {
        id: "interested",
        label: "Заинтересованные",
        value: 450,
        color: "#DCDCDC",
        arcLabelColor: '#8B8B8B',
        borderColor: '#DCDCDC',
    },
]
const diagramFullData: FullData = {
    totals: {
        value: diagramData.reduce((sum,curr)=>sum+curr.value, 0),
    },
    data: diagramData
}

const diagramData2 = [
    {
        id: "initiated deals",
        label: "Начатые сделки",
        value: 350,
        color: "#8B8B8B",
        arcLabelColor: '#A6E2EF',
        borderColor: '#8B8B8B',
    },
    {
        id: "completed deals",
        label: "Завершённые сделки",
        value: 350,
        color: "#A6E2EF",
        arcLabelColor: '#FCFCFC',
        borderColor: 'black',
    },
    {
        id: "interested",
        label: "Заинтересованные",
        value: 500,
        color: "#DCDCDC",
        arcLabelColor: '#8B8B8B',
        borderColor: '#DCDCDC',
    },
]
const diagramFullData2: FullData = {
    totals: {
        value: diagramData2.reduce((sum,curr)=>sum+curr.value, 0),
    },
    data: diagramData2
}




const allDevelopers = Array(10).fill(undefined)
    .map((_,i)=>({ id: `developer${i}`, name: `Застройщик ${i}` }))
const developers = Array(10).fill(undefined).map((_,i)=>({
    id: i,
    ava: avaDefault,
    fio: 'Иванов Иван Иванович',
    projectsCnt: 2,
    objectCnt: 12,
}))
const projects = Array(10).fill(undefined)
    .map((_,i)=>({ id: `project${i}`, name: `Проект ${i}` }))





const BuilderStatisticsPage = () => {
    const [developer, setDeveloper] = useState({ id: null, name: ''})
    const onDeveloper = (ev) => {
        setDeveloper(ev.target.value)
    }

    const [pieData, setPieData] = useState(diagramFullData)
    useEffect(()=>{
        let first = true
        const intervalId = setInterval(()=>{
            setPieData(first ? diagramFullData2 : diagramFullData)
            first = !first
        }, 3000)
        return ()=>clearInterval(intervalId)
    },[])


    const onCreateDeveloper = () => {
        toast.info('Создать застройщика')
    }
    const onShowMore = () => {
        toast.info('Показать ещё')
    }



    return <div className={css.page}>

        <Space h={22.5} />

        <div className={css.titleFrame}>
            <div className={css.title}>Статистика застройщиков</div>
            <div className={css.selectBox}>
                <Select1
                    displayEmpty
                    value={developer}
                    onChange={onDeveloper}
                    renderValue={(selected)=>{
                        if (selected.id===null){
                            return <span data-placeholder-text>Застройщик</span>
                        }
                        return selected.name
                    }}
                >
                    {/*@ts-ignore*/}
                    <MenuItem value={{ id: null, name: ''}}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {/*@ts-ignore*/}
                    { allDevelopers.map(it=><MenuItem key={it.id} value={it}>{it.name}</MenuItem>) }
                </Select1>
            </div>
        </div>

        <Space h={26} />

        <div className={css.statisticsFrame}>

            <div className={css.listData}>
                <div className={css.infoTitle}>Проекты</div>
                <ProjectsSelect/>
                <div className={css.diagramFrame}>
                    <div className={css.diagramLayout}>
                        <div className={css.diagramContainer}>
                            <div className={css.diagramBox}>
                                <PieDiagram fullData={pieData}/>
                            </div>
                        </div>
                        <div className={css.legendBox}>
                            { pieData.data.map(it=><LegendElement key={it.id} color={it.color} title={it.label}/>) }
                        </div>
                    </div>
                </div>
                <div className={css.list}>
                    { Array(3).fill({ name: 'Тип квартиры', value: 'кол-во сделок' })
                        .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                    }
                </div>
            </div>

            <div className={css.listStatisticsContainer}>
                <div className={css.listData}>
                    <div className={css.infoTitle}>Последние сделки</div>
                    <div className={css.list}>
                        { Array(3).fill({ name: 'Менеджер, клиент, тип сделки', value: 'название проекта' })
                            .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                        }
                    </div>
                </div>

                <div className={css.listData}>
                    <div className={css.infoTitle}>Статистика по менеджерам</div>
                    <div className={css.list}>
                        { Array(3).fill({ name: 'Менеджер ФИО', value: 'кол-во сделок' })
                            .map(it=><ListItem2 key={it.name} name={it.name} value={it.value}/>)
                        }
                    </div>
                </div>
            </div>

        </div>

        <Space h={64} />

        <div className={css.developersTitleContainer}>
            <div className={css.title}>Застройщики</div>
            <Button1White onClick={onCreateDeveloper}>Создать застройщика</Button1White>
        </div>

        <Space h={40} />

        <div className={css.developersListContainer}>
            <div className={css.list}>
                { developers.map(it=><ListItem key={it.id} client={it} />) }
            </div>
            <Space h={24}/>
            <div className={css.center}>
                <div className={css.showMore} onClick={onShowMore}>Показать ещё</div>
            </div>
        </div>

        <Space h={64} />

    </div>
}
export default React.memo(BuilderStatisticsPage)




const Arrow1DownIc1 = React.memo(styled(Arrow1DownIc).attrs({
    mainColor: 'black', // icon color
})`
  height: 11px;
  &.MuiSelect-icon {
    right: 16px; // offset from right
  }
  &.MuiSelect-iconOpen { // icon state when menu is open
    transform: rotate(180deg);
  }
`)
const Select1 = React.memo(styled(Select).attrs({
    variant: 'outlined',
    IconComponent: Arrow1DownIc1,
})`
  width: 100%; height: 100%;
  background: #F8F8F8;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #424041;
    border-radius: 0;
  }
  .MuiSelect-select {
    padding-left: 16px;
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
    width: 245px;
    background-color: #F8F8F8;
    :hover {
      background-color: #F8F8F8;
    }
  }
`)






type ListItem2Props = { name: string, value: string }
const ListItem2 = React.memo(({ name, value }: ListItem2Props)=>{
    return <div className={css.listItemFrame}>
        <div className={css.text}>{name}</div>
        <div className={css.text}>{value}</div>
    </div>
})


type LegendElementProps = { color: string, title: string }
const LegendElement = React.memo(({ color, title }: LegendElementProps)=>{
    return <div className={css.legendElement}>
        <div className={css.indicator} style={{ background: color }}/>
        <div className={css.title}>{title}</div>
    </div>
})