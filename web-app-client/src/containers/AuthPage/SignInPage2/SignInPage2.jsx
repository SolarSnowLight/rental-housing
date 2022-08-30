
import css from './SignInPage2.module.scss'
import Space from "../../../components/icons/Space";
import {Button, Input} from "@mui/material";



const SignInPage2 = () => {
    return <div className={css.formFrame}>

        <Space h={245.5}/>

        <div className={css.enterFormContainer}>

            <div className={css.enterTitle}>Вход</div>

            <Space h={48}/>

            <div className={css.inputTitle}>Email</div>

            <Space h={8}/>

            <input className={css.input}
                    placeholder='Введите адрес почты'
            />

            <Space h={16}/>

            <div className={css.inputTitle}>Пароль</div>

            <Space h={8}/>

            <Input type='password'/>

            <Space h={48}/>

            <button className={css.enterBtn}>Войти</button>

            <Space h={48}/>

            <div className={css.bottomTextContainer}>
                <span className={css.text}>
                    Ещё нет аккаунта? <span className={css.action}>Зарегистрироваться</span>
                </span>
            </div>

        </div>

        <Space h={253.5}/>

    </div>
}
export default SignInPage2