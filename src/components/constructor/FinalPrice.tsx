import React, {FC, useEffect, useState} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './final-price.module.css'
import {useDispatch, useSelector} from "../../services/hooks";
import {ORDER_PRICE} from "../../services/constants";
import {useAuth} from "../../services/auth";
import {Redirect, useLocation} from "react-router-dom";
import {getOrderNumberThunk} from "../../services/actions/order";

const FinalPrice = () => {

    let { refreshUser, ...auth } = useAuth();
    const location = useLocation();
    const [isClicked, setClicked] = useState(false);

    const dispatch = useDispatch();

    const store = useSelector(state => state);

    const {order, user} = store;

    useEffect(() => {
        if (order.currentOrderIngredients.length !== 0) {
            dispatch({
                type: ORDER_PRICE,
            })
        }
    }, [order.currentOrderIngredients]);

    const openOrderModal = () => {
        !user.isUserAuth && setClicked(true);
        console.log(order.currentOrderIngredients);
        return order.bun && dispatch(getOrderNumberThunk(order.currentOrderIngredients));
    }

    useEffect(()=> {
        setClicked(false);
        if (!user.isUserAuth) {
            const token = window.localStorage.getItem('refreshToken');
            token && refreshUser(token);
        }
    }, [])

    if (isClicked){
        if (!user.user.email){
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
                <span className='text_type_digits-medium m-2'>{order.orderPrice}</span>
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