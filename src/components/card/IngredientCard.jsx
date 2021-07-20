import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({price, name, img}) => {
    return (
        <div className={styles.card} >
            <section className={`${styles.mainCard} p-4`}>
                <img src={img} alt='ingredient'/>
                <div className={styles.price}>
                    <span className='text text_type_digits-default m-2'>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className={'text text_type_main-small'}>{name}</span>
            </section>

            <section className={styles.mark}>
                <Counter
                    count={1} size="default" />
            </section>
        </div>
    )
}

export default IngredientCard;

IngredientCard.propTypes = {
    price: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    isChosen: PropTypes.bool
};