import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCard = ({ingredientContent, data, modalOpen}) => {
    return (
        <div className={styles.card} onClick={() => {modalOpen(); ingredientContent(data)}}>
            <section className={`${styles.mainCard} p-4`}>
                <img src={data.image} alt='ingredient'/>
                <div className={styles.price}>
                    <span className='text text_type_digits-default m-2'>{data.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <span className={'text text_type_main-small'}>{data.name}</span>
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
    ingredientContent: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
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
    ).isRequired,
    modalOpen: PropTypes.func.isRequired
};