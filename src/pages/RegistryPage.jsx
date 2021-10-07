import styles from './login.module.css';
import AppHeader from "../components/header/AppHeader";
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const RegistryPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <AppHeader/>

            <section style={{height: '500px'}} className={styles.sign}>
                <p className="text text_type_main-medium">
                    Регистрация
                </p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
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
                    Зарегистрироваться
                </Button>

                <p className="text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to='/login'>Войти</Link>
                </p>
            </section>
        </div>
    )
}

export default RegistryPage;