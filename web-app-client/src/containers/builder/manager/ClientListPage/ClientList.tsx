import React from "react";
import avaDefault from 'src/resources/images/ava-default.jpg'
import css from './ClientList.module.scss'
import styled from "styled-components";
import ListItem from "src/components/PersonListItem/PersonListItem";
import Space from "src/components/Space";
import {Button} from "@mui/material";
import { root } from "src/styles";



const clients = [
    {
        id: 1,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 2,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 3,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 4,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
    {
        id: 5,
        ava: avaDefault,
        fio: 'Иванов Иван Иванович',
        projectsCnt: 2,
        objectCnt: 12,
    },
]


const ClientList = () => {

    return <div className={css.page}>
        <div className={css.mainFrame}>

            <Space h={98}/>

            <div className={css.buttonsContainer}>
                <Button1>Заинтересованные</Button1>
                <Button1>Заключившие договор</Button1>
                <Button1>Заключившие договор</Button1>
            </div>

            <Space h={89}/>

            <div className={css.list}>
                { clients.map(it=><ListItem key={it.id} client={it} />) }
            </div>

            <Space h={310}/>

        </div>
    </div>
}
export default React.memo(ClientList)


const Button1 = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: fit-content; height: fit-content;
    padding: 8px 16px;
    
    background-color: #DCDCDC;
    //border: 1px solid #424041;
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


