import React from 'react'
import css from './ModalImageViewer.module.scss'
import CrossIc from "src/components/icons/CrossIc";
import styled from "styled-components";



export type ModalImageViewerProps = {
    onClose?: ()=>void
}
const ModalImageViewer = ({ onClose = ()=>{} }: ModalImageViewerProps) => {

    return <div className={css.transparent}>
        <div className={css.card}>
            <CrossIc1 onClick={onClose} />
        </div>
    </div>
}
export default React.memo(ModalImageViewer)


const CrossIc1 = styled(CrossIc).attrs({
    width: 20, height: 20,
    mainColor: 'black',
})`
  position: absolute;
  top: 14px; right: 14px;
  cursor: pointer;
`

