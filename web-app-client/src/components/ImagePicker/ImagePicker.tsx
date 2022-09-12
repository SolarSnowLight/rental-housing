import styled from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import {Button} from "@mui/material";
import { root } from 'src/styles';
import {utils} from "../../utils/utils";



type ImagePickerProps = JSX.IntrinsicElements['div'] & {
    image?: File|string|undefined
    setImage?: ((image:File|undefined)=>void) | undefined
}

const ImagePicker = React.forwardRef<HTMLDivElement, ImagePickerProps>((
    { image, setImage = ()=>{}, ...props },
    forwardedRef
) => {

    const fileInputRef = useRef<HTMLInputElement>(null)

    const onClick = () => fileInputRef.current?.click()

    const onDelete = (ev: MouseEvent) => {
        ev.stopPropagation()
        setImage(undefined)
    }

    const [imageUrl, setImageUrl] = useState(undefined as undefined|string)
    useEffect(()=>{
        if (image instanceof File){
            (async()=>{
                const url = await utils.readAsUrl(image)
                setImageUrl(url)
            })()
        } else {
            setImageUrl(image)
        }
    },[image])

    const onFileInput = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = (ev.currentTarget.files??[])[0]
        if (file){
            setImage(file)
        }
    }

    return <Frame ref={forwardedRef} {...props} onClick={onClick}>
        <Border borderRadius={4} borderColor={'#1F8DCD'} borderWidth={2} strokeDasharray='8,8' /*cornerSize={8}*//>
        { !image
            ? <Label>Добавить фото</Label>
            : <>
                <Image imageUrl={imageUrl}/>
                <ButtonBox>
                    <Button1 onClick={onDelete}>Удалить</Button1>
                </ButtonBox>
              </>
        }
        <FileInput ref={fileInputRef} type='file' accept='image/*' onInput={onFileInput}/>
    </Frame>
})
export default React.memo(ImagePicker)



const Frame = React.memo(styled.div`
  width: 400px; height: 295px;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  display: grid;
  place-items: center;
`)
const Border = React.memo(styled.div`
  position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  pointer-events: none;
  border: 2px dashed black;
  border-radius: 0px;
`)
const Label = React.memo(styled.div`
  font: 500 18px var(--font-family-text);
  color: #424041;
`)
const FileInput = React.memo(styled.input`
  display: none;
`)



const Image = React.memo(styled.div<{ imageUrl?: string }>`
  place-self: stretch;
  margin: 10px 16px;
  background-image: url("${p=>p.imageUrl+''}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`)


const ButtonBox = React.memo(styled.div`
  position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  padding: 18px 22px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: flex-end;
`)
const Button1 = React.memo(styled(Button)`
  &.MuiButtonBase-root {
    width: 100px; height: 30px;
    
    background-color: ${root.colorGreen};
    border: 1px solid #424041;
    border-radius: 0;
    
    text-transform: none;
    font: 500 18px var(--font-family-text);
    color: black;
    letter-spacing: 0.05em;
    
    :hover {
      background-color: ${root.colorGreen};
    }
  }
`)

