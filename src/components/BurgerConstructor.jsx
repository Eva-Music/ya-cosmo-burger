import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "../styles/burger-constr.module.css"
import FinalPrice from "./FinalPrice";


const BurgerConstructor = ({data}) => {
    return (
        <div className='m-10'>
            <div className={`${styles.construction} p-2`} >
                <section className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </section>

                <section className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                        <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement
                        text="Говяжий метеорит (отбивная)"
                        price={3000}
                        thumbnail={'https://code.s3.yandex.net/react/code/meat-04.png'}
                    />
                </section>

                <section className={styles.dragIngredients}>
                    <div style={{width: 40}}>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                </section>
            </div>

            <FinalPrice/>

        </div>

    )
}

export default BurgerConstructor;