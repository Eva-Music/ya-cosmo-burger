import React, { useEffect, useMemo, FC} from "react";
import styles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ADD_DRAG_INGREDIENT, SET_CURRENT_INGREDIENT, SET_MODAL_STATUS} from "../../services/constants";
import {useDrag} from "react-dnd";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "../../services/hooks";
import {TIngredientsData} from "../../services/types/data";

const IngredientCard: FC<{ data: TIngredientsData}> = ({data}) => {
    const {_id} = data;

    const history = useHistory();

    const dispatch = useDispatch();

    const store = useSelector(state => state);

    const {order} = store;

    const handleIngredientContent = (data: TIngredientsData) => {
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            data
        });
        dispatch( {
            type: SET_MODAL_STATUS,
            status: true
            }
        )
        console.log(order.currentIngredient)
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
    }, [order.ingredientsCounter])

    const count = useMemo(() => {
        const current = order.ingredientsCounter.filter(x => x.id === _id);
        return current.length && current[0]?.count;
    }, [order.currentOrderIngredients])

    return (
        <Link
            to={{ pathname: `/ingredients/${_id}`, state: history.location.state }}
            className={styles.link}
        >
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
        </Link>
    )
}

export default IngredientCard;