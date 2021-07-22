import React, {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../card/IngredientCard";
import {Element } from 'react-scroll'
import styles from './burger-ingredient.module.css'
import PropTypes from "prop-types";

function BurgerIngredients({data}) {

    const [burgerInfo, setBurgerInfo] = useState(
        {
            menuList: [
                {
                    id: 1,
                    name: 'Булки',
                    type: 'bun'
                },
                {
                    id: 2,
                    name: 'Соусы',
                    type: 'sauce'
                },
                {
                    id: 3,
                    name: 'Начинки',
                    type: 'main'
                }
            ],
            current: 'Булки',
            selected: []
        }
    )

    function changeCurrent(e){
        setBurgerInfo({...burgerInfo, current: e});
        // const scrollList = document.querySelector(".scroll-class");
        // const name = document.getElementsByName(e)[0];
        // scrollList.scrollTo({
        //     top: name,
        //     behavior: "smooth"
        // }) не получается что-то(
    }

    return (
        <section>
            <div style={{ display: 'flex' }}>
                {burgerInfo.menuList.map( l => {
                    return <Tab key={l.id} value={l.name} active={burgerInfo.current === l.name}
                                onClick={changeCurrent}>
                        {l.name}
                    </Tab>
                })}
            </div>

            <div style={{height: '700px'}} className={`${styles.ingredientsList} scroll-class`}>
                {burgerInfo.menuList.map( l => {
                    return <div key={l.id}>
                                <Element className="pt-4 pr-10 pb-4 pl-10 text text_type_main-medium" name={l.name}>{l.name}</Element>
                                <div className={styles.cards}>
                                    {data.filter(d => d.type === l.type)
                                        .map(d => <IngredientCard key={d._id} price={d.price} name={d.name} img={d.image}/>)}
                                </div>
                           </div>
                })}
            </div>
        </section>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
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
    )
}

export default BurgerIngredients;