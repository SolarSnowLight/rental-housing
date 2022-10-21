import React, {FormEvent, useState} from 'react'
import css from './BuilderEditPage.module.scss'
import Space from "src/components/Space/Space";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import styled from "styled-components";
import { root } from 'src/styles';
import {toast} from "react-toastify";
import ImageUploading from "react-images-uploading";
import ImagePicker from "src/components/ImagePicker";



const BuilderEditPage = () => {


    const onSave = (ev: FormEvent<unknown>) => {
        ev.preventDefault()
        toast.info('Эта функция ещё не реализована')
    }
    const onCancel = () => {
        toast.info('Эта функция ещё не реализована')
    }


    const [logo, setLogo] = useState(undefined as undefined|string|File)


    /*const [logo, setLogo] = useState([]);
    const onChangeImage = (imageList, addUpdateIndex) => {
        setLogo(imageList);
    };*/


    return <div className={css.page}>

        <Space h={33}/>

        <div className={css.mainTitle}>Редактирование застройщика</div>

        <Space h={56}/>

        <form onSubmit={onSave}>
            <div className={css.fieldsContainer2}>

                <div className={css.widgetBox}>
                    <div className={css.title}>Логотип  *</div>
                    <Space h={8}/>
                    <ImagePicker image={logo} setImage={setLogo} />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title}>Описание</div>
                    <Space h={8}/>
                    <Multiline1 placeholder='Описание' />
                </div>

            </div>

            <Space h={24}/>

            <div className={css.fieldsContainer}>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Название  *</div>
                    <Space h={12}/>
                    <Input1 placeholder='Название застройщика' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Email  *</div>
                    <Space h={12}/>
                    <Input1 placeholder='Вставьте почту' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Телефон  *</div>
                    <Space h={12}/>
                    <Input1 placeholder='Вставьте телефон' />
                </div>

                <div className={css.widgetBox}>
                    <div className={css.title2}>Ссылка на сайт  *</div>
                    <Space h={12}/>
                    <Input1 placeholder='Вставьте ссылку' />
                </div>

            </div>

            <Space h={24}/>

            <div className={css.fieldsContainer}>

                <div className={css.widgetBox} onClick={onCancel}>
                    <Button1White>Отмена</Button1White>
                </div>

                <div className={css.widgetBox}>
                    <Button1 type='submit'>
                        Сохранить изменения
                    </Button1>
                </div>

            </div>
        </form>

    </div>
}
export default React.memo(BuilderEditPage)



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


const Input1 = React.memo(styled(TextField).attrs(p=>({
    variant: "outlined",
    type: 'text',
}))`
  fieldset { // рамка
    border: 1px solid #8B8B8B;
    border-radius: 0;
  }
  .MuiInputBase-root.MuiOutlinedInput-root { // input container
    width: 400px; height: 59px;
    padding-right: 0; 
    padding-left: 0;
  }
  input { // input
    padding-left: 16px;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    ::placeholder {
      color: #8B8B8B;
      opacity: 1;
    }
  }
`)

const Multiline1 = React.memo(styled(TextField).attrs({
    variant: 'outlined',
    type: 'text',
    multiline: true,
    rows: 11, // todo fit height
})`
  width: 400px; height: 295px;
  padding: 16px;

  fieldset { // рамка
    border: 1px solid #8B8B8B;
    border-radius: 0;
  }
  .MuiInputBase-input.MuiOutlinedInput-input  { // textarea
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    &textarea::placeholder {
      color: #8B8B8B;
    }
  }
`)



