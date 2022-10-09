import { animated } from '@react-spring/web'
import React, {useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState} from 'react'
import css from './HorizontalScrollbar.module.scss'
import classNames from "classnames";



// todo press on scroll container to move the center of scrollbar there

export type HorizontalScrollbarProps = JSX.IntrinsicElements['div'] & {
    scrollProps: {
        clientWidth: number // container width
        scrollLeft: number // ширина проскроленного контента, который слева за границей контейнера
        scrollLeftMax: number // максимальная ширина проскроленного контента, который слева за границей контейнера
        scrollWidth: number // content width
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
    const left = (scrollProps.scrollLeft/scrollProps.scrollWidth)*containerProps.width
    const width = (scrollProps.clientWidth/scrollProps.scrollWidth)*containerProps.width

    const setContainerPropsWrap = useCallback(() => {
        const container = containerRef.current!
        const rect = container.getBoundingClientRect()
        const clientX = rect.left
        const clientY = rect.top
        setContainerProps({
            width: container.clientWidth,
            clientX,
            clientY,
        })
    },[])

    useLayoutEffect(()=>{
        setContainerPropsWrap()
        window.addEventListener('resize', setContainerPropsWrap)
        return ()=>window.removeEventListener('resize', setContainerPropsWrap)
    },[])

    const [scrollStart, setScrollStart] = useState(undefined as undefined|{ x: number, y: number, scrollLeft: number })
    const onMouseDown = (ev: React.MouseEvent) => {
        console.log('onMouseDown',ev)
        if (ev.buttons===1){
            setScrollStart({ x: ev.clientX, y: ev.clientY, scrollLeft: scrollProps.scrollLeft })
        }
    }
    useLayoutEffect(()=>{
        if (scrollStart){
            const onMouseMove = (ev: MouseEvent)=>{
                if (scrollStart && ev.buttons===1){
                    const addScrollLeft = ev.clientX-scrollStart.x
                    //console.log('x add', addScrollLeft)
                    const newScrollLeft = scrollStart.scrollLeft + addScrollLeft/containerProps.width*scrollProps.scrollWidth
                    setScrollLeft(newScrollLeft)
                }
            }
            const onMouseUp = (ev: MouseEvent)=>{
                console.log('onMouseUp', ev)
                setScrollStart(undefined)
            }
            document.querySelector('*')!.classList.add(css.noSelect)
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
            return ()=>{
                document.querySelector('*')!.classList.remove(css.noSelect)
                window.removeEventListener('mousemove', onMouseMove)
                window.removeEventListener('mouseup', onMouseUp)
            }
        } else {
            document.querySelector('*')!.classList.remove(css.noSelect)
        }
    },[scrollStart,scrollProps])

    const onClick = (ev: React.MouseEvent) => {
        console.log('click', ev)
    }


    return <div
        ref={containerRef}
        className={classNames(css.container,className)}
        {...restProps}
        onMouseDown={onMouseDown}
        onClick={onClick}
    >
        <div ref={barBoxRef} className={css.barBox} style={{ left, width }}>
            <div className={css.bar}/>
        </div>
    </div>
})
export default React.memo(HorizontalScrollbar)