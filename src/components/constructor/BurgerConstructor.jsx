import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useContext, useEffect, useMemo, useState} from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {DELETE_CURRENT_ORDER_INGREDIENTS} from "../../services/actions/order";

const BurgerConstructor = () => {

    const {
        currentOrderIngredients
    } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const handleIngredientDelete = (data) => {
        dispatch({
            type: DELETE_CURRENT_ORDER_INGREDIENTS,
            data
        })
    }

    // const [bun, setBun] = useState(null);
    // const [middle, setMiddle] = useState({
    //     middle: [],
    // });

    // const [state, setState] = useState({
    //     bun: null,
    //     middle: []
    // });
    //
    // useEffect(() => {
    //     currentOrderIngredients && currentOrderIngredients.forEach(d => {
    //         if (d.type === 'bun'){
    //             setState({
    //                 ...state,
    //                 bun: d
    //             });
    //         } else {
    //             // setMiddle(prevState => ({
    //             //     middle: [...prevState.middle, d]
    //             // }))
    //             setState(prevState =>({
    //                 ...state,
    //                 middle: [...prevState.middle, d]
    //             }))
    //             console.log(state.middle);
    //         }
    //     });
    // }, [currentOrderIngredients]);
    //
    // useEffect(() => {
    //         setState({
    //             bun: null,
    //             middle: []
    //         });
    //     },[]
    // );

    const bun = useMemo(() => {
        return currentOrderIngredients.filter(x => x.type === 'bun')[0];
    }, [currentOrderIngredients]);

    const middle = useMemo(() => {
        return currentOrderIngredients.filter(x => x.type !== 'bun');
    }, [currentOrderIngredients]);

    return (
        <div className='m-10'>
            <ul style={{height: '500px'}} className={`${styles.construction} p-2`}>
                {currentOrderIngredients && bun &&
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
                    {currentOrderIngredients && middle && middle.map((d, index) => {
                        return <section key={index} className={styles.dragIngredients}>
                            <div style={{width: 40}}>
                                <DragIcon type="primary"/>
                            </div>
                            <ConstructorElement
                                text={d.name}
                                price={d.price}
                                thumbnail={d.image}
                                handleClose={() => handleIngredientDelete(d)}
                            />
                        </section>
                    })}
                </li>

                {currentOrderIngredients && bun &&
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
}

export default BurgerConstructor;