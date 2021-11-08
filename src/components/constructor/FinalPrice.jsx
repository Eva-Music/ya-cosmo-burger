import React, {useEffect, useState} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './final-price.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber, ORDER_PRICE} from "../../services/actions/order";
import {useAuth} from "../../services/auth";
import {Redirect, useLocation} from "react-router-dom";

const FinalPrice = () => {

    let { refreshUser, ...auth } = useAuth();
    const location = useLocation();
    const [isClicked, setClicked] = useState(false);

    const {
        currentOrderIngredients,
        orderPrice,
        bun,
        user,
        isUserAuth
    } = useSelector(state => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentOrderIngredients.length !== 0) {
            dispatch({
                type: ORDER_PRICE,
            })
        }
    }, [currentOrderIngredients]);

    const openOrderModal = () => {
        !isUserAuth && setClicked(true);
        return bun && dispatch(getOrderNumber(currentOrderIngredients));
    }

    useEffect(()=> {
        setClicked(false);
        if (!isUserAuth) {
            const token = window.localStorage.getItem('refreshToken');
            token && refreshUser(token);
        }
    }, [])

    if (isClicked){
        if (!user.email){
            return (<Redirect to={{
                    pathname: '/login',
                    state: {from: location}
                }}/>
            );
        }
    }

    return (
        <div className={styles.main}>
            <section className={`${styles.mainPrice} m-5`}>
                <span className='text_type_digits-medium m-2'>{orderPrice}</span>
                <CurrencyIcon type="primary"/>
            </section>

            <section onClick={openOrderModal} className='m-5 button'>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
}


export default FinalPrice;