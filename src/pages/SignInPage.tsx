import styles from './login.module.css';
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useSelector} from "../services/hooks";
import {useAuth} from "../services/auth";

const SignInPage = () => {

    let { signIn, ...auth } = useAuth();

    const store = useSelector(state => state);

    const {user} = store;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();

    const handleOnSubmit = (e: React.FormEvent) => {
        console.log(email, password);
        signIn(email, password);
        e.preventDefault();
    }

    if (user.isUserAuth) {
        return (<Redirect to={{
                // @ts-ignore
                pathname: location.state?.from?.pathname,
            }}/>
        );
    }

    return (
        <form style={{height: '450px'}} onSubmit={handleOnSubmit} className={styles.sign}>
            <p className={`${styles.head} text text_type_main-medium`}>
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

            <div>
                <p className="text_type_main-default text_color_inactive">
                    Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
                </p>
            </div>

        </form>
    )
}

export default SignInPage;