import React, {useContext, useEffect, useState} from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './final-price.module.css'
import PropTypes from "prop-types";
import {IngredientsContext} from "../../services/burgerIngredients";

const FinalPrice = ({orderContent, modalOpen}) => {
    const {state} = useContext(IngredientsContext);
    const [finalPrice, setFinalPrice] = useState(0);

    useEffect(() => {
        state.productData && setFinalPrice(state.productData.map(x => x.price).reduce((x,y) => x+y, 0));
    }, [state.productData]);

    return(
        <div className={styles.main}>
            <section className={`${styles.mainPrice} m-5`}>
                <span className='text_type_digits-medium m-2'>{finalPrice}</span>
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
    modalOpen: PropTypes.func.isRequired,
    state: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired
        })
    )
}

export default FinalPrice;