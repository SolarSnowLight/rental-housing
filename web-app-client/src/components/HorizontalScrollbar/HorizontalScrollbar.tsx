import { animated } from '@react-spring/web'
import React, {useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './HorizontalScrollbar.module.scss'
import classNames from "classnames";
import {GetDimensions} from "src/utils/GetDimensions";



// todo press on scroll container to move the center of scrollbar there
// todo min scrollbar width

export type HorizontalScrollbarProps = JSX.IntrinsicElements['div'] & {
    scrollProps: {
        clientWidth: number // container width
        scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
        scrollLeftMax: number // максимальная ширина проскроленного контента, который слева за границей контейнера
        scrollWidth: number // content width
    }
    scrollProps2?: {
        contentFrameWidth: number
        leftInvisibleContentWidth: number
        leftInvisibleContentMaxWidth: number
        fullContentWidth: number
    }
    scrollProps3?: {
        containerContentW: number
        contentLeftInvisibleW: number
        contentLeftInvisibleMaxW: number
        contentW: number
    }
    setScrollLeft: (scrollLeft: number)=>void
}
export type HorizontalScrollbarRef = HTMLDivElement

const HorizontalScrollbar = React.forwardRef<HorizontalScrollbarRef, HorizontalScrollbarProps>((
    { scrollProps, setScrollLeft, ...props },
    forawardedRef,
) => {
    const { className, ...restProps } = props

    const containerRef = useRef<HorizontalScrollbarRef>(null)
    useImperativeHandle(forawardedRef, ()=>containerRef.current!)
    const barBoxRef = useRef<HTMLDivElement>(null)


    const [containerProps, setContainerProps] = useState({ width: 0, clientX: 0, clientY: 0 })
    const left = useMemo(()=>{
        if (scrollProps.scrollWidth<=0) return 0
        return (scrollProps.scrollLeft/scrollProps.scrollWidth)*containerProps.width
    },[scrollProps])
    const width = useMemo(()=>{
        if (scrollProps.scrollWidth<=0) return 0
        return (scrollProps.clientWidth/scrollProps.scrollWidth)*containerProps.width
    },[scrollProps])


    const setContainerPropsWrap = useCallback(() => {
        const container = containerRef.current!
        const d = new GetDimensions(container)
        setContainerProps({
            width: d.clientWidth,
            clientX: d.left,
            clientY: d.top,
        })
    },[])


    useLayoutEffect(()=>{
        const container = containerRef.current!
        const containerResizeObserver = new ResizeObserver((entries)=>{
            setContainerPropsWrap()
        })
        setContainerPropsWrap()
        containerResizeObserver.observe(container)
        return ()=>{
            containerResizeObserver.disconnect()
        }
    },[containerRef.current])


    const [scrollStart, setScrollStart] = useState(undefined as undefined|{ x: number, y: number, scrollLeft: number })
    const onPointerDown = (ev: React.PointerEvent) => {
        //console.log('onPointerDown',ev)
        // todo not only for mouse
        if (ev.pointerType==='mouse' && ev.buttons===1){
            setScrollStart({ x: ev.clientX, y: ev.clientY, scrollLeft: scrollProps.scrollLeft })
        }
    }
    useLayoutEffect(()=>{
        if (scrollStart){
            const onPointerMove = (ev: PointerEvent)=>{
                if (scrollStart && ev.buttons===1){
                    const addScrollLeft = ev.clientX-scrollStart.x
                    //console.log('x add', addScrollLeft)
                    const newScrollLeft = scrollStart.scrollLeft + addScrollLeft/containerProps.width*scrollProps.scrollWidth
                    setScrollLeft(newScrollLeft)
                }
            }
            const onPointerUp = (ev: PointerEvent)=>{
                //console.log('onPointerUp', ev)
                setScrollStart(undefined)
            }
            document.querySelector('*')!.classList.add(css.noSelect)
            window.addEventListener('pointermove', onPointerMove)
            window.addEventListener('pointerup', onPointerUp)
            return ()=>{
                document.querySelector('*')!.classList.remove(css.noSelect)
                window.removeEventListener('pointermove', onPointerMove)
                window.removeEventListener('pointermove', onPointerUp)
            }
        } else {
            document.querySelector('*')!.classList.remove(css.noSelect)
        }
    },[scrollStart,scrollProps])


    /*const onPointerDown = (ev: React.PointerEvent) => {
        console.log('pointerDown',ev)
    }*/



    return <div
        ref={containerRef}
        className={classNames(css.container,className)}
        {...restProps}
        onPointerDown={onPointerDown}
    >
        <div ref={barBoxRef} className={css.barBox} style={{ left, width }}>
            <div className={css.bar}/>
        </div>
    </div>
})
export default React.memo(HorizontalScrollbar)