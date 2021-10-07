import AppHeader from "../components/header/AppHeader";
import React from "react";
import IngredientDetails from "../components/details/IngredientDetails";
import styles from './ingredients.module.css';

const IngredientDetailsPage = () => {

    return (
        <div>
            <AppHeader/>

            <div className={styles.inner}>
                <IngredientDetails/>
            </div>
        </div>
    );
}

export default IngredientDetailsPage;
