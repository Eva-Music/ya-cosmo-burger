import styles from './login.module.css';
import AppHeader from "../components/header/AppHeader";
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <AppHeader/>

            <section style={{height: '450px'}} className={styles.sign}>
                <p className="text text_type_main-medium">
                    Вход
                </p>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    icon={'ShowIcon'}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <Button type="primary" size="medium">
                    Войти
                </Button>

                <p className="text_type_main-default text_color_inactive">
                    Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
                </p>
            </section>
        </div>
    )
}

export default SignInPage;