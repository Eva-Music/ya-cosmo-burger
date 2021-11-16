import styles from './login.module.css';
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {useAuth} from "../services/auth";

const ForgotPasswordPage = () => {

    const location = useLocation();

    let { forgotUserPassword, ...auth } = useAuth();

    const {
        resetEmailSuccess
    } = useSelector(state => state.order);

    const [email, setEmail] = useState('');

    const handleOnSubmit = (e) => {
        forgotUserPassword(email);
        e.preventDefault();
    }

    if (resetEmailSuccess) {
        return (<Redirect to={{
                pathname: '/reset-password',
                state: {from: location}
            }}/>
        );
    }

    return (
        <form style={{height: '400px'}} onSubmit={handleOnSubmit} className={styles.sign}>
            <p className={`${styles.head} text text_type_main-medium`}>
                Восстановление пароля
            </p>
            <Input
                type={'email'}
                placeholder={'Укажите e-mail'}
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <Button type="primary" size="medium">
                Восстановить
            </Button>

            <p className={`${styles.head} text_type_main-default text_color_inactive`}>
                Вспомнили пароль? <Link to='/login'>Войти</Link>
            </p>
        </form>
    )
}

export default ForgotPasswordPage;