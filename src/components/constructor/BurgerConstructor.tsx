import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useCallback} from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import {useDispatch, useSelector} from "../../services/hooks";
import {useDrop} from "react-dnd";
import MainIngredient from "./MainIngredient";
import {CHANGE_CURRENT_ORDER_INGREDIENTS} from "../../services/constants";

const BurgerConstructor: FC<{onDropHandler(): void }> = ({onDropHandler}) => {

    const dispatch = useDispatch();

    const store = useSelector(state => state);

    const {order} = store;

    const [{isOver}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler();
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });


    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: CHANGE_CURRENT_ORDER_INGREDIENTS, dragIndex, hoverIndex
        });
    }, [order.currentOrderIngredients]);

    return (
        <div className='m-10'>
            <ul ref={dropTarget} style={{height: '500px'}} className={`${styles.construction} ${isOver && styles.target} p-2`}>
                {order.bun != null &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={order.bun?.name + '(верх)'}
                        price={order.bun?.price}
                        thumbnail={order.bun?.image}
                    />
                </li>
                }

                <li className={`${styles.construction} ${styles.scrollIngredients}`}>
                    {order.currentOrderIngredients &&
                    order.currentOrderIngredients.map((d, index) => {
                        return <MainIngredient moveCard={moveCard} index={index} id={d.id} data={d} key={d.id}/>
                    })}
                </li>

                {order.bun !== null &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={order.bun?.name + '(низ)'}
                        price={order.bun?.price}
                        thumbnail={order.bun?.image}
                    />
                </li>
                }
            </ul>

            <FinalPrice/>
        </div>
    );
}

export default BurgerConstructor;