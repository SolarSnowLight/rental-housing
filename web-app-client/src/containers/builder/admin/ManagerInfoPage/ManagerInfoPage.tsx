import React, { useState } from 'react'
import css from './ManagerInfoPage.module.scss'
import {toast} from "react-toastify";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ImagePickerRound from "src/components/ImagePicker/ImagePickerRound";
import Input2 from "src/components/UI-Styled/Input/Input2/Input2";
import ButtonRed2 from "src/components/UI-Styled/Button/ButtonRed2/ButtonRed2";
import ListItem from "src/components/list-items/ListItem";
import buildingDefault from 'src/resources/images/building-default.png'
import Space from "src/components/Space";


import avaDefault from 'src/resources/images/ava-default.jpg'
import logoDefault from 'src/resources/images/company-logo-default.png'

import buildingExample1 from 'src/resources/images/examples/building-example-1.webp';
import buildingExample2 from 'src/resources/images/examples/building-example-2.webp';
import buildingExample3 from 'src/resources/images/examples/building-example-3.jpg';
import homePage from 'src/resources/images/home_page.jpg';
import imagePlaceholder from 'src/resources/images/image-placeholder.png'
import mainPageBgc from 'src/resources/images/main-page-bgc.jpg'
import neonSunrise from 'src/resources/images/examples/neon-sunrise-web.jpg'
import retrowave1 from 'src/resources/images/examples/retrowave-1.png';
import hotlineMiami2 from 'src/resources/images/examples/wallpaper-Hotline-Miami-2---Wrong-Number2560x1440.jpg';
import needMoreAcidMarkII from 'src/resources/images/examples/need_more_acid_mark_ii.jpg';
import retrowave2 from 'src/resources/images/examples/Retrowave_(2).jpg';
import ModalManagerToProjects from "src/components/ModalManagerToProjects/ModalManagerToProjects";


/*
todo
    controlled inputs
    validation

 */



const projects = [...Array(10).keys()].map(i=>({
    id: i+'',
    image: buildingDefault,
    name: 'Название',
    deliveryDate: 'дата сдачи',
}))
const projects2 = [...Array(6).keys()].map(i=>({
    id: i+'',
    builderLogo: logoDefault,
    images: [buildingExample1,buildingExample2,buildingExample3],
    name: 'Название проекта',
    year: 2025,
    objectsCnt: i+1,
}))
projects2[0].images = [buildingExample1, buildingExample2, buildingExample3, homePage, imagePlaceholder, mainPageBgc, neonSunrise, retrowave1, hotlineMiami2, needMoreAcidMarkII, retrowave2]
const managerId = 'dsknfoqpafjdmlnv'





const ManagerInfoPage = () => {

    const [showModalManagerToProjects, setShowModalManagerToProjects] = useState(false)

    const onEditManagerFunctions = () => {
        setShowModalManagerToProjects(true)
    }
    const onDeleteManager = () => {
        toast.info('Удалить менеджера')
    }

    const [image, setImage] = useState(undefined as File|string|undefined)

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        console.log('onSubmit', ev)
        toast.info('Submit')
    }


    return <>

        { showModalManagerToProjects && <ModalManagerToProjects
            managerId={managerId}
            projects={projects2}
            onClose={()=>setShowModalManagerToProjects(false)}
        /> }

        <div className={css.page}>

            <Space h={32}/>

            <div className={css.first}>
                <div className={css.mainTitle}>Информация о менеджере</div>
                <div className={css.btnWrapper}>
                    <ButtonGreen2 onClick={onEditManagerFunctions}>
                        Изменить функции менеджера
                    </ButtonGreen2>
                </div>
                <div className={css.btnWrapper}>
                    <ButtonRed2 onClick={onDeleteManager}>
                        Удалить менеджера
                    </ButtonRed2>
                </div>
            </div>

            <Space h={45}/>

            <form onSubmit={onSubmit} style={{ display: 'contents' }}>

                <div className={css.imagePickerBox}>
                    <ImagePickerRound image={image} setImage={setImage} />
                </div>

                <Space h={32}/>

                <div className={css.third}>
                    <div className={css.inputBox}>

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

                        <Space h={48}/>

                        <ButtonGreen2 type='submit'>
                            Сохранить изменения
                        </ButtonGreen2>

                    </div>

                    <div className={css.projectsTableBox}>
                        <div className={css.projectsTable}>
                            { projects.map(it=><ListItem key={it.id} item={{ image: it.image, title: it.name, info: it.deliveryDate }} />) }
                        </div>
                    </div>

                </div>

            </form>


        </div>
    </>
}
export default React.memo(ManagerInfoPage) as unknown as typeof ManagerInfoPage