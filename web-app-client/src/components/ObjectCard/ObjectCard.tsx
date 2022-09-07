import React from 'react'
import css from './ObjcectCard.module.scss'


type ObjectCardProps = {
}

const ObjectCard = ({}: ObjectCardProps) => {
    return <div className={css.frame}>
        Карточка объекта
    </div>
}

export default React.memo(ObjectCard);