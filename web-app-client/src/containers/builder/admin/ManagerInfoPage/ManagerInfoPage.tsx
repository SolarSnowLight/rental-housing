import React, { useState } from 'react'
import css from './ManagerInfoPage.module.scss'
import {toast} from "react-toastify";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ImagePickerRound from "src/components/ImagePicker/ImagePickerRound";
import Input2 from "src/components/UI-Styled/Input/Input2/Input2";

/*
todo
    controlled inputs
    validation

 */


const ManagerInfoPage = () => {

    const onEditManagerFunctions = () => {
        toast.info('Изменить функции менеджера')
    }

    const [image, setImage] = useState(undefined as File|string|undefined)

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        console.log('onSubmit', ev)
        toast.info('Submit')
    }


    return <div className={css.page}>

        <form onSubmit={onSubmit} style={{ display: 'contents' }}>

            <div className={css.mainTitle}>Информация о менеджере</div>

            <ButtonGreen2 onClick={onEditManagerFunctions}>
                Изменить функции менеджера
            </ButtonGreen2>

            <div className={css.managerNick}>Ник менеджера</div>

            <ImagePickerRound className={css.imagePicker} image={image} setImage={setImage} />

            <div className={css.widgetBox}>
                <div className={css.title}>Имя</div>
                <Input2 placeholder='Имя' />
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>Фамилия</div>
                <Input2 placeholder='Фамилия' />
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>Отчество</div>
                <Input2 placeholder='Отчество' />
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>Никнейм</div>
                <Input2 placeholder='Никнейм' />
            </div>

            <div className={css.widgetBox}>
                <div className={css.title}>email</div>
                <Input2 placeholder='email' />
            </div>

            <ButtonGreen2 type='submit'>
                Сохранить изменения
            </ButtonGreen2>

        </form>

    </div>
}
export default React.memo(ManagerInfoPage) as unknown as typeof ManagerInfoPage