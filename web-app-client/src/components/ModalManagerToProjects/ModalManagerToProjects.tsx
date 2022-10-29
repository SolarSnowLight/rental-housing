import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './ModalManagerToProjects.module.scss'
import CrossIc from "src/components/icons/Cross2Ic";
import styled from "styled-components";
import {utils} from "src/utils/utils";
import classNames from "classnames";
import {useDisableHtmlScroll} from "src/hooks/useDisableHtmlScroll/useDisableHtmlScroll";
import ObjectCard2 from "src/components/ObjectCard2/ObjectCard2";
import ButtonGreen2 from "src/components/UI-Styled/Button/ButtonGreen2/ButtonGreen2";
import ButtonGray2 from "src/components/UI-Styled/Button/ButtonGray2/ButtonGray2";




/*export type ManagerToProjectAction = {
    managerId: string
    projectId: string
    type: 'add'|'remove'
}*/
type Project = {
    id: string
    builderLogo?: string|undefined // ссылка на лого застройщика
    images?: string[] | null | undefined // массив ссылок на изображения
    name: string
    year: string|number
    objectsCnt: number
}


export type ModalManagerToProjectsProps = {
    managerId?: string | null | undefined
    projects?: Project[] | null | undefined
    onClose?: ()=>void
}
const ModalManagerToProjects = ({
    managerId,
    projects,
    onClose = ()=>{}
}: ModalManagerToProjectsProps) => {
    projects ??= []

    // disable scroll of faded page
    useDisableHtmlScroll()


    const [selectedProjectId, setSelectedProjectId] = useState(undefined as string|undefined)




    return <div className={css.fade}>
        <div className={css.frame}>

            <div className={css.closeContainer}>
                <div className={css.closeBox} onClick={onClose}>
                    <CrossIc1/>
                </div>
            </div>

            <div className={css.card}>

                <div className={css.projectsListContainer}>
                    <div className={css.content}>
                        { projects.map(it=><ObjectCard2 key={it.id} object={it}/>) }
                    </div>
                </div>

                <div className={css.buttons}>
                    <ButtonGreen2>Добавить в проект</ButtonGreen2>
                    <ButtonGreen2>Связаться с менеджером</ButtonGreen2>
                    <ButtonGreen2>Удалить из проекта</ButtonGreen2>
                    <ButtonGray2>Отмена</ButtonGray2>
                </div>

            </div>

        </div>
    </div>
}
export default React.memo(ModalManagerToProjects) as unknown as typeof ModalManagerToProjects



let CrossIc1 = styled(CrossIc).attrs({
    width: 17, height: 17,
    mainColor: '#F8F8F8',
})``
CrossIc1 = React.memo(CrossIc1) as unknown as typeof CrossIc1



