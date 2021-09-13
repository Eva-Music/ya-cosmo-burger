import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useCallback} from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import MainIngredient from "./MainIngredient";
import {CHANGE_CURRENT_ORDER_INGREDIENTS} from "../../services/actions/order";

const BurgerConstructor = ({onDropHandler}) => {

    const dispatch = useDispatch();

    const {
        currentOrderIngredients,
        bun
    } = useSelector(state => state.order);

    const [{isOver}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });


    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: CHANGE_CURRENT_ORDER_INGREDIENTS, dragIndex, hoverIndex
        });
    }, [currentOrderIngredients]);

    return (
        <div className='m-10'>
            <ul ref={dropTarget} style={{height: '500px'}} className={`${styles.construction} ${isOver && styles.target} p-2`}>
                {bun != null &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + '(верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
                }

                <li className={`${styles.construction} ${styles.scrollIngredients}`}>
                    {currentOrderIngredients &&
                    currentOrderIngredients.map((d, index) => {
                        return <MainIngredient moveCard={moveCard} index={index} id={d.id} data={d} key={d.id}/>
                    })}
                </li>

                {bun !== null &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + '(низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
                }
            </ul>

            <FinalPrice/>
        </div>
    );
}

BurgerConstructor.propTypes = {
    onDropHandler: PropTypes.func.isRequired
}

export default BurgerConstructor;