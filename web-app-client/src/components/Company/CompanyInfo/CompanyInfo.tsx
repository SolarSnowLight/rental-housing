import css from './CompanyInfo.module.scss';

import React from "react";
import styled from "styled-components";
import {Button} from "@mui/material";
import { root } from 'src/styles';
import { toast } from "react-toastify";
import Space from 'src/components/Space';


type CompanyInfoProps = {
    companyInfo: {
        logo: string // image url / data-url
        title: string
        email: string
        link: string
        phone: string
        description: string
    }
}


const CompanyInfo = ({ companyInfo }: CompanyInfoProps) => {

    const onChat = () => {
        toast.info('Чат онлайн')
    }

    return <div className={css.mainFrame}>
        <div className={css.infoFrame}>
            <div className={css.titleContainer}>
                <img className={css.logo} src={companyInfo.logo} />
                <div className={css.title}>{companyInfo.title}</div>
            </div>

            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.email}</div>
            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.link}</div>
            <Space h={16} />
            <div className={css.infoItem}>{companyInfo.phone}</div>
            <Space h={42} />

            <Button1White onClick={onChat}>
                Чат онлайн
            </Button1White>
        </div>
        <div className={css.descriptionFrame}>{companyInfo.description}</div>
    </div>
}
export default React.memo(CompanyInfo);




const Button1 = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: 400px; height: 59px;

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
    background-color: #F8F8F8;
    :hover {
      background-color: #F8F8F8;
    }
  }
`)