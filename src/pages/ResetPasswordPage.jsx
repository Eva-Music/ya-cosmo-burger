import styles from './login.module.css';
import AppHeader from "../components/header/AppHeader";
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../services/actions/order";

const ResetPasswordPage = () => {

    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const {
        resetPasswordSuccess
    } = useSelector(state => state.order);

    const handleButtonClick = () => {
        dispatch(resetPassword(password, code));
    }

    if (resetPasswordSuccess) {
        return (<Redirect to={{
                pathname: '/login'
            }}/>
        );
    }

    return (
        <div>
            <AppHeader/>

            <section style={{height: '350px'}} className={styles.sign}>
                <p className="text text_type_main-medium">
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
                <Button onClick={handleButtonClick}
                        type="primary" size="medium">
                    Сохранить
                </Button>

                <p className="text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to='/login'>Войти</Link>
                </p>
            </section>
        </div>
    )
}

export default ResetPasswordPage;