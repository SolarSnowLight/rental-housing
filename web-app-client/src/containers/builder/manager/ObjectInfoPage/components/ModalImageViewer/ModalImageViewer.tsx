import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './ModalImageViewer.module.scss'
import CrossIc from "src/components/icons/CrossIc";
import styled from "styled-components";
import {RemoteImage} from "../../ObjectInfoPage";
import {ArrowDownIc} from "src/components/icons";
import Arrow2ForwardIc from "src/components/icons/Arrow2ForwardIc";
import {utils} from "src/utils/utils";
import classNames from "classnames";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";



export type ModalImageViewerProps = {
    onClose?: (()=>void) | undefined
    images?: RemoteImage[] | undefined
    defaultSelectedImageId?: string|undefined
}
const ModalImageViewer = ({
    onClose = ()=>{}, images = [], defaultSelectedImageId
}: ModalImageViewerProps) => {

    // disable scroll of faded page
    useLayoutEffect(()=>{
        document.querySelector('html')!.classList.add(css.noScroll)
        return ()=>document.querySelector('html')!.classList.remove(css.noScroll)
    },[])




    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const selectedRef = useRef<HTMLDivElement>(null)

    const [scrollProps, setScrollProps] = useState({ clientWidth: 0, scrollLeft: 0, scrollLeftMax: 0, scrollWidth: 0 })
    const setScrollPropsWrap = (element: HTMLElement) => setScrollProps({
        clientWidth: element.clientWidth,
        scrollLeft: element.scrollLeft,
        // @ts-ignore
        scrollLeftMax: element.scrollLeftMax,
        scrollWidth: element.scrollWidth,
    })
    useEffect(()=>{
        const timerId = setTimeout(()=>setScrollPropsWrap(containerRef.current!),500)
        return ()=>clearTimeout(timerId)
    },[])

    const [selectedImageId, setSelectedImageId] = useState(defaultSelectedImageId ?? images[0]?.id)
    const selectedImage = useMemo(()=>images.find(it=>it.id===selectedImageId),[selectedImageId,images])
    useEffect(()=>{
        const container = containerRef.current!
        const selected = selectedRef.current!
        const containerW = container.clientWidth
        console.log('container',container)
        console.log('selected',selected)
        const containerComputedStyles = window.getComputedStyle(container)
        console.log('containerComputedStyles',containerComputedStyles)
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

    const onScroll = (ev: React.UIEvent<HTMLDivElement>) => {
        //console.log(ev)

        const container = ev.target as any
        // console.log('clientHeight (container height)',container.clientHeight)
        // console.log('clientTop (container top offset)',container.clientTop)
        // console.log('clientWidth (container width)',container.clientWidth)
        // console.log('clientLeft (container left offset)',container.clientLeft)
        // console.log('scrollLeft (current left hidden content)',container.scrollLeft) // ширина проскроленного контента, который слева за границей контейнера
        // console.log('scrollLeftMax (max left hidden content width)',container.scrollLeftMax) // максимальная ширина проскроленного контента, который слева за границей контейнера
        // console.log('scrollWidth (content width)',container.scrollWidth)
        // console.log('scrollTop',container.scrollTop)
        // console.log('scrollTopMax',container.scrollTopMax)
        // console.log('scrollHeight',container.scrollHeight)
        setScrollPropsWrap(container)
    }
    const setScrollLeft = (scrollLeft: number) => {
        //console.log('scrollLeft', scrollLeft)
        containerRef.current!.scrollTo({ left: scrollLeft })
    }

    return <div className={css.fade}>
        <div className={css.frame}>
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

            <img className={css.image} src={selectedImage?.url} />

            <div className={css.arrowRight}>
                <div className={css.container}>
                    <div className={css.box} onClick={moveRight}>
                        <Arrow2Forward/>
                    </div>
                </div>
            </div>
            <div ref={containerRef} className={css.imageListFrame} onScroll={onScroll}>
                <div ref={contentRef} className={css.box}>
                    { images.map(it=><div
                        ref={it===selectedImage ? selectedRef : undefined}
                        key={it.id}
                        className={classNames(css.imagePreview, {[css.selected]: it===selectedImage })}
                    >
                        <img
                            className={css.image}
                            src={it.url}
                            onClick={()=>setSelectedImageId(it.id)}
                        />
                    </div>) }
                </div>
            </div>
            <HorizontalScrollbar1 scrollProps={scrollProps} setScrollLeft={setScrollLeft}/>
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

