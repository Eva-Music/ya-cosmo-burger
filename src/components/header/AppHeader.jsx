import React from "react";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './header-style.module.css';


const AppHeader = () => {
    return (
        <div className={styles.header}>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                <BurgerIcon type="primary"/>
                <span className={`${styles.text} text text_type_main-small`}>Конструктор</span>
            </div>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                <ListIcon type="secondary" />
                <span className={`${styles.text} text text_type_main-small text_color_inactive`}>Лента заказов</span>
            </div>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                <Logo />
            </div>
            <div className={"pt-4 pr-10 pb-4 pl-10"}/>
            <div className={`${styles.menuItem} pt-4 pr-10 pb-4 pl-10`}>
                <ProfileIcon type="secondary" />
                <span className={`${styles.text} text text_type_main-small text_color_inactive`}>Личный кабинет</span>
            </div>
        </div>
    )
}

export default AppHeader;