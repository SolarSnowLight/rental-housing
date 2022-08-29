import React from 'react'


const Space = ({w,h,flexGrow}) => <div style={{ width: w, height: h, flexGrow: flexGrow }}/>

export default React.memo(Space)