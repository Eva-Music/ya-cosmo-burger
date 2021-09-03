import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useContext, useEffect, useState} from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import PropTypes from "prop-types";
import {IngredientsContext} from "../../services/burgerIngredients";

const BurgerConstructor = ({orderContent, modalOpen}) => {
    const {state, setState} = useContext(IngredientsContext);

    const [bun, setBun] = useState(null);
    const [middle, setMiddle] = useState({
        middle: [],
    });

    useEffect(() => {
        clean();
        state.productData && state.productData.forEach(d => {
            if (d.type === 'bun'){
                setBun(d);
            } else {
                setMiddle(prevState => ({
                    middle: [...prevState.middle, d]
                }))
            }
        });
        state.productData &&
        setState({...state, orders: {...state.orders, ingredients: state.productData.map(d => d._id)}});
    }, [state.productData]);

    const clean = () => {
        setBun(null);
        setMiddle({middle: []});
    }

    return (
        <div className='m-10'>
            {/*{console.log(bun, middle)}*/}
            <ul style={{height: '500px'}} className={`${styles.construction} p-2`}>
                {bun && <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + '(верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}

                <li className={`${styles.construction} ${styles.scrollIngredients}`}>
                    {middle.middle.map(d => {
                        return <section key={d._id} className={styles.dragIngredients}>
                            <div style={{width: 40}}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={d.name}
                                price={d.price}
                                thumbnail={d.image}
                            />
                        </section>
                    })}
                </li>

                {bun && <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + '(низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>}
            </ul>

            <FinalPrice orderContent={orderContent} modalOpen={modalOpen}/>
        </div>
    );
}

BurgerConstructor.propTypes = {
    orderContent: PropTypes.func.isRequired,
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
    ),
    modalOpen: PropTypes.func.isRequired
}

export default BurgerConstructor;