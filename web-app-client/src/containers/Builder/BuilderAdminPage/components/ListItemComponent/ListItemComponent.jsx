import styles from './ListItemComponent.module.css';

import defaultProfileImg from '../../../../../resources/images/default_profile.png'

const ListItemComponent = ({ column1 = '', column2 = '', column3 = '', clickHandler = () => { } }) => {
    const columnCheck = (column) => {
        if (column.length <= 0) {
            return false;
        }

        return true;
    };

    return (
        <div className={styles["list-item"]}>
            <div className={styles["list-item__left"]}>
                <div>
                    <img
                        className={styles["item-img"]}
                        onClick={() => {
                            clickHandler();
                        }}
                        src={defaultProfileImg}
                    />
                </div>
                {
                    columnCheck(column1) &&
                    <div>
                        <span
                            className={styles["text-h4"]}
                            onClick={() => {
                                clickHandler();
                            }}
                        >{column1}</span>
                    </div>
                }
            </div>
            <div className={styles["list-item__right"]}>
                {
                    columnCheck(column2) &&
                    <div>
                        <span
                            className={styles["text-span"]}
                            onClick={() => {
                                clickHandler();
                            }}
                        >{column2}</span>
                    </div>
                }
                {
                    columnCheck(column3) &&
                    <div>
                        <span
                            className={styles["text-span"]}
                            onClick={() => {
                                clickHandler();
                            }}
                        >{column3}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default ListItemComponent;