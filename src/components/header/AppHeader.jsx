import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-style.module.css';
import {useHistory} from "react-router-dom";

const AppHeader = () => {
    const history = useHistory();

    return (
        <div className={styles.header}>
            <div className={`${styles.menuItem} pt-4 pr-6 pb-4 pl-10`}>
                <BurgerIcon type="primary"/>
                <span className={`${styles.text} text text_type_main-small`}>Конструктор</span>
            </div>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-4`}>
                <ListIcon type="secondary" />
                <span className={`${styles.text} text text_type_main-small text_color_inactive`}>Лента заказов</span>
            </div>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-8`}>
                <Logo />
            </div>
            <div className={"pt-4 pr-10 pb-4 pl-10"}/>
            <div onClick={() => history.push('/profile')} className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                <ProfileIcon type="secondary" />
                <span className={`${styles.text} text text_type_main-small text_color_inactive`}>Личный кабинет</span>
            </div>
        </div>
    )
}

export default AppHeader;