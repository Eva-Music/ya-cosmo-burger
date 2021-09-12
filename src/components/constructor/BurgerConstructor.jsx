import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import MainIngredient from "./MainIngredient";

const BurgerConstructor = ({onDropHandler}) => {

    const {
        currentOrderIngredients,
    } = useSelector(state => state.order);


    const [{isOver},dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });

    return (
        <div className='m-10'>
            <ul ref={dropTarget} style={{height: '500px'}} className={`${styles.construction} ${isOver && styles.target} p-2`}>
                {currentOrderIngredients &&
                currentOrderIngredients.filter(x => x.type === 'bun')[0] &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={currentOrderIngredients.filter(x => x.type === 'bun')[0].name + '(верх)'}
                        price={currentOrderIngredients.filter(x => x.type === 'bun')[0].price}
                        thumbnail={currentOrderIngredients.filter(x => x.type === 'bun')[0].image}
                    />
                </li>
                }

                <li className={`${styles.construction} ${styles.scrollIngredients}`}>
                    {currentOrderIngredients &&
                    currentOrderIngredients.map((d, index) => {
                        if ( d.type !== 'bun') {
                            return <MainIngredient index={index} id={index} data={d} key={index}/>
                        }
                    })}
                </li>

                {currentOrderIngredients &&
                currentOrderIngredients.filter(x => x.type === 'bun')[0] &&
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={currentOrderIngredients.filter(x => x.type === 'bun')[0].name + '(низ)'}
                        price={currentOrderIngredients.filter(x => x.type === 'bun')[0].price}
                        thumbnail={currentOrderIngredients.filter(x => x.type === 'bun')[0].image}
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