import React, {useState} from "react";
import styles from './profile.module.css';
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {SET_USER} from "../services/actions/order";
import {useAuth} from "../services/auth";

const ProfilePage = () => {

    let { signOut, ...auth } = useAuth();

    const {
        user,
    } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const [params, setParams] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleOnSubmit = () => {
        dispatch({
            type: SET_USER,
            name: params.name,
            email: params.email,
            password: params.password
        });
    }

    const logOut = () => {
        user.refreshToken && signOut(user.refreshToken);
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <section style={{height: '250px'}} className={styles.main}>

                        <div className={styles.block}>
                            <p className={`${styles.btn} text text_type_main-medium`}>
                                Профиль
                            </p>

                            <p className={`${styles.btn} text text_type_main-medium text_color_inactive`}>
                                История заказов
                            </p>

                            <p onClick={logOut} className={`${styles.btn} text text_type_main-medium text_color_inactive`}>
                                Выход
                            </p>
                        </div>

                        <form onSubmit={handleOnSubmit} className={styles.block}>
                            <Input
                                type={'text'}
                                placeholder={user.name}
                                onChange={e => setParams({
                                    ...params,
                                    name: e.target.value
                                })}
                                value={params.name}
                                icon={'EditIcon'}
                            />

                            <Input
                                type={'email'}
                                placeholder={user.email}
                                onChange={e => setParams({
                                    ...params,
                                    email: e.target.value
                                })}
                                value={params.email}
                                icon={'EditIcon'}
                            />

                            <Input
                                type={'password'}
                                placeholder={user.password}
                                onChange={e => setParams({
                                    ...params,
                                    password: e.target.value
                                })}
                                value={params.password}
                                icon={'EditIcon'}
                            />
                        </form>

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