import React from "react";
import {Element} from "react-scroll";
import styles from "./burger-ingredient.module.css";
import IngredientCard from "../card/IngredientCard";
import spinner from "../../images/spinner-197px.svg";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const IngredientComponent = ({name, type, onDragHandler}) => {

    const {
        allIngredientsData
    } = useSelector(state => state.order);

    return (
        <div>
            <Element className="pt-4 pr-10 pb-4 pl-10 text text_type_main-medium" name={name}>{name}</Element>
            <div className={styles.cards}>
                {allIngredientsData ? (allIngredientsData.filter(d => d.type === type)
                        .map(d =>
                            <IngredientCard onDragHandler={onDragHandler} key={d._id} data={d}/>))
                    : <img src={spinner} alt="load"/>}
            </div>
        </div>
    );

};

IngredientComponent.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default IngredientComponent;