import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-style.module.css';
import {Link} from "react-router-dom";

const AppHeader = () => {

    return (
        <div className={styles.header}>
            <Link to={{ pathname: `/`}}>
                <div className={`${styles.menuItem} pt-4 pr-6 pb-4 pl-10`}>
                    <BurgerIcon type="primary"/>
                    <p className={`${styles.link} text text_type_main-small`}>Конструктор</p>
                </div>
            </Link>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-4`}>
                <ListIcon type="secondary" />
                <p className={`${styles.link} text text_type_main-small text_color_inactive`}>Лента заказов</p>
            </div>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-8`}>
                <Logo />
            </div>
            <div className={"pt-4 pr-10 pb-4 pl-10"}/>
            <Link to={{ pathname: `/profile`}}>

                <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                    <ProfileIcon type="secondary" />
                    <p className={`${styles.link} text text_type_main-small text_color_inactive`}>Личный кабинет</p>
                </div>
            </Link>
        </div>
    )
}

export default AppHeader;