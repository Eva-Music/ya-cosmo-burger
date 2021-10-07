import styles from './login.module.css';
import AppHeader from "../components/header/AppHeader";
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../services/actions/order";

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();

    const {
        resetEmailSuccess
    } = useSelector(state => state.order);

    const [email, setEmail] = useState('');

    const handleButtonClick = () => {
        dispatch(forgotPassword(email));
    }

    if (resetEmailSuccess) {
        return (<Redirect to={{
                pathname: '/reset-password'
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
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Button onClick={handleButtonClick} type="primary" size="medium">
                    Восстановить
                </Button>

                <p className="text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to='/login'>Войти</Link>
                </p>
            </section>
        </div>
    )
}

export default ForgotPasswordPage;