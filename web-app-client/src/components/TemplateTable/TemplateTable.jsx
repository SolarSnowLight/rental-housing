import { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import styles from './TemplateTable.module.css';

const TemplateTable = () => {
    const [token, setToken] = useState([
        [{ value: "Номер", type_component: "text" }, { value: "Адрес", type_component: "text" }],
        [{ value: "Ширина", type_component: "text" }, { value: "Статус", type_component: "text" }],
        [{ value: "Длина", type_component: "text" }, { value: "Общая стоимость", type_component: "text" }],
        [{ value: "Площадь", type_component: "text" }, { value: "Стоимость в кв. м.", type_component: "text" }],
    ]);

    let visibleAddColumn = false;

    return (
        <table style={{
            borderSpacing: "0px",
            borderCollapse: "collapse"
        }}>
            <tr>
                <th
                    style={{
                        borderBottom: "1px solid #000000",
                        borderLeft: "1px solid #000000",
                        borderTop: "1px solid #000000"
                    }}
                    rowSpan={token.length + 1}
                    scope="rowgroup">
                    <div className={styles["block-th__text"]}>
                        <span className='span__text__black'>Номер этажа</span>
                    </div>
                </th>
            </tr>
            {
                token.map((item, itemIndex) => {
                    if (itemIndex > 0) {
                        visibleAddColumn = true;
                    }

                    return (
                        <tr key={itemIndex}>
                            {
                                item.map((subItem) => {
                                    return (
                                        <td
                                            style={{ border: "1px solid #000000" }}
                                            key={subItem.value}
                                        >
                                            {
                                                subItem.type_component == "text" &&
                                                <div className={styles["block-td__text"]}>
                                                    <span className='span__text__black'>{subItem.value}</span>
                                                </div>
                                            }
                                            {
                                                subItem.type_component == "input" &&
                                                <div className={styles["block-td__text"]}>
                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        sx={{
                                                            borderRadius: '0px !important',
                                                            border: 'none',
                                                            width: '100%',
                                                            '&:hover fieldset': {

                                                                border: 'none',
                                                                borderRadius: '0px',
                                                            },
                                                            'fieldset': {
                                                                border: 'none',
                                                                borderRadius: '0px'
                                                            },
                                                        }}
                                                        InputProps={{
                                                            inputProps: {
                                                                style: { textAlign: "center" },
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    )
                                })
                            }

                            {
                                !visibleAddColumn &&
                                <td
                                    rowSpan={token.length}
                                    style={{
                                        width: '16px !important'
                                    }}>
                                    <div
                                        className={styles["block-td__text-column"]}
                                    >
                                        <span
                                            className='span__text__gray'
                                            onClick={() => {
                                                const templObj = { value: "", type_component: "input" };
                                                const currentData = JSON.parse(JSON.stringify(token));

                                                for (let i = 0; i < currentData.length; i++) {
                                                    currentData[i].push(templObj);
                                                }

                                                setToken(currentData);
                                            }}
                                        >Добавить столбец</span>
                                    </div>
                                </td>
                            }
                        </tr>
                    )
                })
            }
            <tr>
                <th
                    colSpan={token.length + 1}
                    scope="rowgroup">
                    <div
                        className={styles["block-th__text"]}
                        style={{ marginTop: "16px" }}
                    >
                        <span
                            className='span__text__gray'
                            onClick={() => {
                                const templObj = { value: "", type_component: "input" };
                                const templArray = [];
                                for (let i = 0; i < token[0].length; i++) {
                                    templArray.push(templObj);
                                }

                                const currentData = JSON.parse(JSON.stringify(token));
                                currentData.push(templArray);

                                setToken(currentData);
                            }}
                        >Добавить строку</span>
                    </div>
                </th>
            </tr>
        </table>
    )
}

export default TemplateTable;