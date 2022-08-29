import { ReactComponent as SvgComponent } from '../../resources/images/logo-2.svg'
import React from 'react'


const LogoIc = ({ mainColor = 'black', size, ...props }) => {
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
export default React.memo(LogoIc)