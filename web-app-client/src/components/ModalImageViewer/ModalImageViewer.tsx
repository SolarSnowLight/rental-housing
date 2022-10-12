import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './ModalImageViewer.module.scss'
import CrossIc from "src/components/icons/CrossIc";
import styled from "styled-components";
import Arrow2ForwardIc from "src/components/icons/Arrow2ForwardIc";
import {utils} from "src/utils/utils";
import classNames from "classnames";
import HorizontalScrollbar from "src/components/HorizontalScrollbar/HorizontalScrollbar";
import {GetDimensions} from "src/utils/GetDimensions";
import {useScrollbar} from "src/hooks/useScrollbar/useScrollbar";
import {useDisableHtmlScroll} from "src/hooks/useDisableHtmlScroll/useDisableHtmlScroll";



export type RemoteImage = {
    id: string
    url: string
    description: string
}
export type ModalImageViewerProps = {
    onClose?: (()=>void) | undefined
    images?: RemoteImage[] | undefined
    defaultSelectedImageId?: string|undefined
}
const ModalImageViewer = ({
    onClose = ()=>{}, images = [], defaultSelectedImageId
}: ModalImageViewerProps) => {

    // disable scroll of faded page
    useDisableHtmlScroll()

    const [selectedImageId, setSelectedImageId] = useState(defaultSelectedImageId ?? images[0]?.id)
    const selectedI = useMemo(()=>images.findIndex(it=>it.id===selectedImageId),[selectedImageId,images])


    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const selectedRef = useRef<HTMLDivElement>(null)


    const [scrollProps, onContainerScroll, setContainerScroll] = useScrollbar(containerRef, contentRef)


    // autoscroll to selected image if it is not visible at all
    useEffect(()=>{
        const container = containerRef.current!
        const selected = selectedRef.current!
        const cd = new GetDimensions(container)
        const sd = new GetDimensions(selected)
        if (sd.right<=cd.left) container.scrollTo({ left: cd.scrollLeft-(cd.left-sd.left) })
        else if (sd.left>=cd.right) container.scrollTo({ left: cd.scrollLeft+(sd.right-cd.right) })
    },[selectedImageId])


    const moveLeft = () => {
        const currI = images.findIndex(it=>it.id===selectedImageId)
        const nextI = utils.mod(currI-1, images.length)
        setSelectedImageId(images[nextI].id)
    }
    const moveRight = () => {
        const currI = images.findIndex(it=>it.id===selectedImageId)
        const nextI = utils.mod(currI+1, images.length)
        setSelectedImageId(images[nextI].id)
    }


    return <div className={css.fade}>
        <div className={css.frame}>

            <div className={css.position}>{selectedI+1} / {images.length}</div>

            <div className={css.crossContainer} onClick={onClose}>
                <CrossIc1/>
            </div>

            <div className={css.arrowLeft}>
                <div className={css.container}>
                    <div className={css.box} onClick={moveLeft}>
                        <Arrow2Backward/>
                    </div>
                </div>
            </div>

            <img className={css.image} src={images[selectedI]?.url} />

            <div className={css.arrowRight}>
                <div className={css.container}>
                    <div className={css.box} onClick={moveRight}>
                        <Arrow2Forward/>
                    </div>
                </div>
            </div>
            <div ref={containerRef} className={css.imageListFrame} onScroll={onContainerScroll}>
                <div ref={contentRef} className={css.box}>
                    { images.map(it=><div
                        ref={it===images[selectedI] ? selectedRef : undefined}
                        key={it.id}
                        className={classNames(css.imagePreview, {[css.selected]: it===images[selectedI] })}
                    >
                        <img
                            className={css.image}
                            src={it.url}
                            onClick={()=>setSelectedImageId(it.id)}
                        />
                    </div>) }
                </div>
            </div>
            <HorizontalScrollbar1 scrollProps={scrollProps} setContainerScroll={setContainerScroll}/>
            {/*<HorizontalScrollbar1 scrollProps={scrollProps} setScrollLeft={setScrollLeft} style={{ width: '60%', gridArea: 'scroll1' }}/>*/}
            {/*<HorizontalScrollbar1 scrollProps={scrollProps} setScrollLeft={setScrollLeft} style={{ width: '160%', gridArea: 'scroll2' }}/>*/}
        </div>
    </div>
}
export default React.memo(ModalImageViewer)



const CrossIc1 = React.memo(styled(CrossIc).attrs({
    width: 17, height: 17,
    mainColor: '#F8F8F8',
})``)


const Arrow2Forward = React.memo(styled(Arrow2ForwardIc).attrs({
    width: 18, height: 18,
    mainColor: '#F8F8F8',
})``)
const Arrow2Backward = React.memo(styled(Arrow2ForwardIc).attrs({
    width: 18, height: 18,
    mainColor: '#F8F8F8',
})`
    transform: rotate(180deg);
`)

const HorizontalScrollbar1 = styled(HorizontalScrollbar)`
  grid-area: scroll;
`

