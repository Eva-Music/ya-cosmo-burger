import styles from './login.module.css';
import React, {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useSelector} from "../services/hooks";
import {useAuth} from "../services/auth";

const ResetPasswordPage = () => {

    let { resetUserPassword, ...auth } = useAuth();

    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [isNotAllowed, setIsNotAllowed] = useState(false);

    const location = useLocation();

    const store = useSelector(state => state);

    const {user} = store;

    const handleButtonClick = (e: React.FormEvent) => {
        resetUserPassword(password, code);
        e.preventDefault();
    }

    useEffect(() => {
        setIsNotAllowed(false);
        // @ts-ignore
        if (!location.state || !location.state.from.pathname &&
            // @ts-ignore
            location.state.from.pathname !== '/forgot-password'){
            setIsNotAllowed(true);
        }
    }, []);

    if (user.resetPasswordSuccess || isNotAllowed) {
        return (<Redirect to={{
                pathname: '/login'
            }}/>
        );
    }

    return (
        <form style={{height: '500px'}} onSubmit={handleButtonClick} className={styles.sign}>
            <p className={`${styles.head} text text_type_main-medium`}>
                Восстановление пароля
            </p>
            <Input
                type={'password'}
                placeholder={'Введите новый пароль'}
                onChange={e => setPassword(e.target.value)}
                value={password}
                icon={'ShowIcon'}
            />
            <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                onChange={e => setCode(e.target.value)}
                value={code}
            />
            <Button type="primary" size="medium">
                Сохранить
            </Button>

            <p className={`${styles.head} text_type_main-default text_color_inactive`}>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </form>
    )
}

export default ResetPasswordPage;