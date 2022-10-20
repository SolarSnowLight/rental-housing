import React, {useRef} from 'react'
import css from './ObjcectCard.module.scss'
import buildingDefault from 'src/resources/images/building-default.png'
import {wordUtils} from "src/utils/wordUtils";
import {useGalleryScrollbar} from "src/hooks/useScrollbar/useGalleryScrollbar";
import GalleryHorizontalScrollbar from "src/components/GalleryHorizontalScrollbar/GalleryHorizontalScrollbar";

type empty = null|undefined

export type ObjectCardProps = {
    object: {
        builderLogo?: string|undefined // ссылка на лого застройщика
        images?: string[] | empty // массив ссылок на изображения
        objectName: string
        year: string|number
        objectCnt: number
    }
}

const ObjectCard = (props: ObjectCardProps) => {
    const b = props.object
    b.images ??= [buildingDefault]

    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scrollProps, onContainerScroll, setContainerScroll, scrollToElementByIndex] = useGalleryScrollbar(containerRef, contentRef, b.images.length)

    return <div className={css.frame}>
        <div className={css.imagesScrollBox}>
            <div className={css.imagesFrame} ref={containerRef} onScroll={onContainerScroll}>
                <div className={css.contentContainer} ref={contentRef}>
                    { b.images.map(it=><div key={it} className={css.imageContainer}>
                        <img className={css.imageBgc} src={it} alt={'Building'}/>
                        <div className={css.blur}/>
                        <img className={css.image} src={it} alt={'Building'}/>
                    </div>) }
                </div>
            </div>
            <GalleryHorizontalScrollbar className={css.scroll}
                                        scrollProps={scrollProps}
                                        setContainerScroll={setContainerScroll}
                                        scrollToElementByIndex={scrollToElementByIndex}/>
        </div>
        { b.builderLogo && <img className={css.logo} src={b.builderLogo} alt='Builder Logo'/> }
        {/*<div className={css.arrowLeftBox}>
            <div className={css.hoverDetector}/>
        </div>*/}
        {/*<div className={css.arrowRightBox}>
            <div className={css.bgc}></div>
        </div>*/}
        <div className={css.name}>{b.objectName}</div>
        <div className={css.year}>Сдача {b.year}</div>
        <div className={css.count}>{b.objectCnt} {wordUtils.objectsPlural(b.objectCnt)}</div>
    </div>
}

export default React.memo(ObjectCard);