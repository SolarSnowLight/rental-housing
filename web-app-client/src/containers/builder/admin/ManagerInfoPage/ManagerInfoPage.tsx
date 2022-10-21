import React, { useState } from 'react'
import css from './ManagerInfoPage.module.scss'
import {toast} from "react-toastify";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ImagePicker from "src/components/ImagePicker";


const ManagerInfoPage = () => {

    const onEditManagerFunctions = () => {
        toast.info('Изменить функции менеджера')
    }

    const [image, setImage] = useState(undefined as File|string|undefined)

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        console.log('onSubmit', ev)
    }


    return <div className={css.page}>

        <form onSubmit={onSubmit}>

            <div className={css.mainTitle}>Информация о менеджере</div>

            <ButtonGreen2 onClick={onEditManagerFunctions}>
                Изменить функции менеджера
            </ButtonGreen2>

            <div className={css.managerNick}>Ник менеджера</div>

            <ImagePicker image={image} setImage={setImage} />

            <ButtonGreen2 type='submit'>
                Сохранить изменения
            </ButtonGreen2>

        </form>

    </div>
}
export default React.memo(ManagerInfoPage) as unknown as typeof ManagerInfoPage