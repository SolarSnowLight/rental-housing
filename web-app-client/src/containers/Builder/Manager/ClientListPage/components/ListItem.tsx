import React from "react";
import styled from "styled-components";
import {commonStyled} from "src/styles/commonStyled";
import Space from "../../../../../components/Space";


type ListItemProps = JSX.IntrinsicElements['div'] & {
    client: {
        ava?: string|undefined
        fio: string
        projectsCnt: number|string
        objectsCnt: number|string
    }
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>((
    { client, ...props  },
    forwardedRef
) => {
    return <Container ref={forwardedRef} {...props}>
        <Image src={client.ava}/>
        <Fio>{client.fio}</Fio>
        <Info>{client.projectsCnt} проекта, {client.objectsCnt} объектов</Info>
    </Container>
})
export default React.memo(ListItem)
export type { ListItemProps }


const Container = React.memo(styled.div`
  width: 100%; height: 91px;
  ${commonStyled.row};
  column-gap: 16px;
  border-bottom: 1px solid #424041;
`)

const Image = React.memo(styled.div<{ src?: string|undefined }>`
  height: 100%; aspect-ratio: 1;
  background-image: url(${p=>p.src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`)
const Fio = React.memo(styled.div`
  ${commonStyled.centerV};
  flex-grow: 1;
  font: 500 24px var(--font-family-text);
  color: black;
  letter-spacing: 0.05em;
`)
const Info = React.memo(styled.div`
  ${commonStyled.centerV};
  justify-content: end;
  font: 500 18px var(--font-family-text);
  color: #424041;
  letter-spacing: 0.05em;
`)