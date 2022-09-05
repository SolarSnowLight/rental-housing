import { ReactComponent as SvgComponent } from 'src/resources/images/arrow-up-right.svg'
import React from 'react'


const ArrowUpRightIc = ({ mainColor = 'black', size, ...props }) => {
    const { style, ...restProps } = props
    return <SvgComponent
        style={{
            width: size, height: size,
            maxWidth: '100%', maxHeight: '100%',
            fill: mainColor, stroke: mainColor,
            ...style
        }}
        {...restProps}
    />
}
export default React.memo(ArrowUpRightIc)