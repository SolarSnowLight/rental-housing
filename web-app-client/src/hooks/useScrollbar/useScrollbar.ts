import React, {useCallback, useLayoutEffect, useState} from "react";
import {GetDimensions} from "src/utils/GetDimensions";


export type UseScrollbarOptions = {

}
export const useScrollbar = (
    containerRef: React.RefObject<HTMLElement>,
    contentRef: React.RefObject<HTMLElement>,
    options: UseScrollbarOptions = { }
) => {


    const [scrollProps, setScrollProps] = useState({
        clientWidth: 0,
        scrollLeft: 0,
        scrollLeftMax: 0,
        scrollWidth: 0
    })
    const setScrollPropsWrap = useCallback((container: HTMLElement) => {
        const dimens = new GetDimensions(container)
        //console.log('container.scrollWidth',container.scrollWidth)
        setScrollProps({
            clientWidth: dimens.clientWidth,
            scrollLeft: dimens.scrollLeft,
            scrollLeftMax: dimens.scrollLeftMax,
            scrollWidth: dimens.scrollWidth,
        })
    },[])


    useLayoutEffect(()=>{
        const container = containerRef.current!
        const content = contentRef.current!
        const containerResizeObserver = new ResizeObserver((entries)=>{
            //const e = entries[0]
            setScrollPropsWrap(container)
            //console.log('containerResize',e)
            //console.log('onresize container.scrollWidth',e.target.scrollWidth)
        })
        containerResizeObserver.observe(container)
        const contentResizeObserver = new ResizeObserver((entries)=>{
            //const e = entries[0]
            setScrollPropsWrap(container)
        })
        contentResizeObserver.observe(content)
        setScrollPropsWrap(container)
        //console.log('1container',containerRef.current!)
        //console.log('1content',contentRef.current!)
        return ()=>{
            containerResizeObserver.disconnect()
            contentResizeObserver.disconnect()
        }
    },[contentRef.current, contentRef.current, setScrollPropsWrap])


    return [scrollProps, setScrollPropsWrap] as const
}