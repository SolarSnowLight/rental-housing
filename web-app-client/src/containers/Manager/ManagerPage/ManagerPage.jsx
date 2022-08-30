import css from './ManagerPage.module.scss';
import Space from "../../../components/icons/Space";
import {InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

const ManagerPage = () => {

    const [age, setAge] = useState(9)


    return (
        <div className={css.page}>
            <div className={css.mainFrame}>

                <Space h={33}/>

                <div className={css.formTitle}>Создание застройщика</div>

                <Space h={32}/>

                <div className={css.formFrame}>

                </div>

                <Space h={33}/>

                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={(ev)=>{
                        console.log(ev)
                        setAge(ev.target.value)
                    }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>



            </div>
        </div>
    )
}

export default ManagerPage;