import React from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './final-price.module.css'
import PropTypes from "prop-types";

const FinalPrice = ({orderContent, modalOpen}) => {
    return(
        <div className={styles.main}>
            <section className={`${styles.mainPrice} m-5`}>
                <span className='text_type_digits-medium m-2'>3240</span>
                <CurrencyIcon type="primary" />
            </section>

            <section onClick={() => {modalOpen(); orderContent();}} className='m-5 button'>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        </div>
    );
}

FinalPrice.propTypes = {
    orderContent: PropTypes.func.isRequired,
    modalOpen: PropTypes.func.isRequired
}

export default FinalPrice;