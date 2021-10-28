import styles from './login.module.css';
import React, {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {SET_USER_LOGIN} from "../services/actions/order";
import {useAuth} from "../services/auth";

const SignInPage = () => {

    let { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        user
    } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        dispatch({
            type: SET_USER_LOGIN,
            email: email,
            password: password
        });

        e.preventDefault();
    }

    useEffect(() => {
        if (user.email !== ''){
            init();
        }
    }, [user])

    const init = async () => {
        await signIn();
    };

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