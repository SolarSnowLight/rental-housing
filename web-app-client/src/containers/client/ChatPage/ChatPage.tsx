import React from 'react'
import Space from 'src/components/Space'
import css from './ChatPage.module.scss'
import Chat from "./components/Chat";


const ChatPage = () => {

    return <div className={css.page}>

        <Space h={32}/>

        <div className={css.titleBox}>
            <div className={css.title}>Чат</div>
        </div>

        <Space h={32}/>

        <div className={css.chatFrame}>
            <Chat/>
        </div>

    </div>
}
export default React.memo(ChatPage) as unknown as typeof ChatPage