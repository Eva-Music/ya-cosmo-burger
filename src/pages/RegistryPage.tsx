import styles from './login.module.css';
import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useAuth} from "../services/auth";
import {useSelector} from "../services/hooks";

const RegistryPage = () => {

    let { register, ...auth } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const store = useSelector(state => state);

    const {user} = store;

    const handleOnSubmit = (e: React.FormEvent) => {
        register(email, name, password);
        e.preventDefault();
    }

    if (user.isUserAuth) {
        return (<Redirect to={{
                pathname: '/profile'
            }}/>
        );
    }

    return (
        <form style={{height: '500px'}} onSubmit={handleOnSubmit} className={styles.sign}>
            <p className={`${styles.head} text text_type_main-medium`}>
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

            <div>
                <p className="text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to='/login'>Войти</Link>
                </p>
            </div>
        </form>
    )
}

export default RegistryPage;