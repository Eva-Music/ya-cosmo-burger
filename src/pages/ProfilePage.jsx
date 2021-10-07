import React, {useEffect, useState} from "react";
import AppHeader from "../components/header/AppHeader";
import styles from './profile.module.css';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAuth} from "../services/auth";

const ProfilePage = () => {

    let {getUser, ...auth} = useAuth();

    const user = async () => await getUser();

    const [params, setParams] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const {email, login} = user();
        setParams({...params, email: email, name: login})
    }, [])

    return (
        <div>
            <AppHeader/>

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <section style={{height: '250px'}} className={styles.main}>

                        <div className={styles.block}>
                            <p className="text text_type_main-medium">
                                Профиль
                            </p>

                            <p className="text text_type_main-medium text_color_inactive">
                                История заказов
                            </p>

                            <p className="text text_type_main-medium text_color_inactive">
                                Выход
                            </p>
                        </div>

                        <div className={styles.block}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={e => setParams({
                                    ...params,
                                    name: e.target.value
                                })}
                                value={params.name}
                                icon={'EditIcon'}
                            />

                            <Input
                                type={'email'}
                                placeholder={'Логин'}
                                onChange={e => setParams({
                                    ...params,
                                    email: e.target.value
                                })}
                                value={params.email}
                                icon={'EditIcon'}
                            />

                            <Input
                                type={'password'}
                                placeholder={'Пароль'}
                                onChange={e => setParams({
                                    ...params,
                                    password: e.target.value
                                })}
                                value={params.password}
                                icon={'EditIcon'}
                            />
                        </div>

                    </section>
                    <div className={styles.main}>
                        <p className={`text_type_main-default text_color_inactive`}>
                            В этом разделе вы можете <br/> изменить свои персональные данные
                        </p>
                        <div style={{width: '200px'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;