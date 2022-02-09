import React from "react";
import {Element} from "react-scroll";
import styles from "./burger-ingredient.module.css";
import IngredientCard from "../card/IngredientCard";
import spinner from "../../images/spinner-197px.svg";
import {useSelector} from "../../services/hooks";

type TIngredientComponent = {
    name: string;
    type: string;
}

const IngredientComponent = ({name, type}: TIngredientComponent) => {

    const store = useSelector(state => state);
    const {ingredients} = store;

    return (
        <div>
            <Element className="pt-4 pr-10 pb-4 pl-10 text text_type_main-medium" name={name}>{name}</Element>
            <div className={styles.cards}>
                {ingredients.allIngredientsData ? (ingredients.allIngredientsData.filter(d => d.type === type)
                        .map(d =>
                                <IngredientCard key={d._id} data={d}/>
                        ))
                    : <img src={spinner} alt="load"/>}
            </div>
        </div>
    );

};

export default IngredientComponent;