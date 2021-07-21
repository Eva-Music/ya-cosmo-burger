import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-constr.module.css"
import FinalPrice from "./FinalPrice";
import PropTypes from "prop-types";

const BurgerConstructor = ({data}) => {
    return (
        <div className='m-10'>
            <ul className={`${styles.construction} p-2`} >
                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>

                <li style={{height: '500px'}} className={`${styles.construction} ${styles.scrollIngredients}`} >
                    {data.filter(d => d.type !== 'bun').map(d =>{
                        return <section key={d._id} className={styles.dragIngredients}>
                            <div style={{width: 40}}>
                                {d.type !== 'bun' && <DragIcon type="primary"/> }
                            </div>
                            <ConstructorElement
                                text={d.name}
                                price={d.price}
                                thumbnail={d.image}
                            />
                        </section>
                    })}
                </li>

                <li className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </li>
            </ul>

            <FinalPrice/>

        </div>

    )
}

BurgerConstructor.propTypes = {
    price: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;