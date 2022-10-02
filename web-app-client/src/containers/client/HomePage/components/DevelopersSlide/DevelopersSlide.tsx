import React from "react";
import css from './DevelopersSlide.module.scss'
import styled from "styled-components";
import {Button} from "@mui/material";
import Space from "src/components/Space";
import { root } from "src/styles";

import ListItem from "src/components/ClientListItem/ClientListItem";

import avaDefault from 'src/resources/images/ava-default.jpg'
import {toast} from "react-toastify";


const developers = [
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



const DevelopersSlide = () => {

    const onOpenAll = () => {
        toast.info('Открыть всё')
    }


    return <div className={css.developersSlide}>

        <div className={css.title}>Застройщики</div>

        <Space h={24}/>

        <div className={css.list}>
            { developers.map(it=><ListItem key={it.id} client={it} />) }
        </div>

        <Space h={24}/>

        <div className={css.openAll} onClick={onOpenAll}>Открыть всё</div>

    </div>
}
export default React.memo(DevelopersSlide)




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
