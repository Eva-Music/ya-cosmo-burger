import React, {useCallback, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {ADD_CURRENT_ORDER_INGREDIENTS, ADD_DRAG_INGREDIENT, SET_CURRENT_INGREDIENT} from "../../services/actions/order";
import {useDrag} from "react-dnd";

const IngredientCard = ({data}) => {
    const {_id} = data;

    const dispatch = useDispatch();

    const {
        ingredientsCounter,
        currentOrderIngredients
    } = useSelector(state => state.order);

    const handleIngredientContent = (data) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            data
        });
    }

    const [{isDrag, opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: {_id},
        collect: monitor => ({
            isDrag: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    useEffect(() => {
        isDrag && dispatch({
            type: ADD_DRAG_INGREDIENT,
            data
        });
    }, [isDrag])

    useEffect(() => {
    }, [ingredientsCounter])

    const count = useMemo(() => {
        const current = ingredientsCounter.filter(x => x.id === _id);
        return current.length && current[0].count;
    }, [currentOrderIngredients])

    return (
        <div className={styles.card} style={{opacity: opacity}}
             onClick={() => {handleIngredientContent(data)}}>

            <section ref={dragRef} className={`${styles.mainCard} p-4`}>
                <img src={data.image} alt='ingredient'/>
                <div className={styles.price}>
                    <span className='text text_type_digits-default m-2'>{data.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <span className={'text text_type_main-small'}>{data.name}</span>
            </section>

            <section className={styles.mark}>
                {count !== 0 && <Counter
                    count={count} size="default"/>
                }
            </section>

        </div>
    )
}

export default IngredientCard;

IngredientCard.propTypes = {
    data: PropTypes.shape({
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
        }).isRequired,
};