import React from "react";
import {useInView} from "react-intersection-observer";
import IngredientComponent from "./IngredientComponent";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";

function BurgerIngredients({onDragHandler}) {

    const [ refBun, inViewBun ] = useInView({
        threshold: 1,
    });

    const [ refSauce, inViewSauce ] = useInView({
        threshold: 0,
    });

    const [ refMain, inViewMain ] = useInView({
        threshold: 0,
    });

    return (
        <section >
            <div style={{ display: 'flex' }}>
                <Tab value='Булки' active={inViewBun}>Булки</Tab>

                <Tab value='Соусы' active={!inViewBun && inViewSauce} >
                    Соусы
                </Tab>

                <Tab value='Начинки' active={!inViewSauce && inViewMain}>
                    Начинки
                </Tab>
            </div>

            <div style={{height: '600px'}} className={`${styles.ingredientsList} scroll-class`}>
                <div ref={refBun} >
                    <IngredientComponent onDragHandler={onDragHandler} name='Булки' type='bun'/>
                </div>

                <div ref={refSauce} >
                    <IngredientComponent onDragHandler={onDragHandler} name='Соусы' type='sauce'/>
                </div>

                <div ref={refMain} >
                    <IngredientComponent onDragHandler={onDragHandler} name='Начинки' type='main'/>
                </div>

            </div>
        </section>
    );

}

export default BurgerIngredients;