import React, {useEffect} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './final-price.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber, ORDER_PRICE} from "../../services/actions/order";

const FinalPrice = () => {

    const {
        currentOrderIngredients,
        orderPrice,
        bun
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
        return bun && dispatch(getOrderNumber(currentOrderIngredients));
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