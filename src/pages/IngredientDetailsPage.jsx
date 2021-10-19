import AppHeader from "../components/header/AppHeader";
import React, {useEffect} from "react";
import IngredientDetails from "../components/details/IngredientDetails";
import styles from './ingredients.module.css';
import {Link, useLocation} from "react-router-dom";
import Modal from "../components/modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {getListIngredients, SET_CURRENT_INGREDIENT} from "../services/actions/order";

const IngredientDetailsPage = () => {

    let location = useLocation();
    const dispatch = useDispatch();

    const {
        currentIngredient,
        allIngredientsData
    } = useSelector(state => state.order);


    useEffect(() => {
        if(!currentIngredient){
            const current = location.pathname.split("/")[2];
            const data = allIngredientsData.filter(x => x._id === current)[0];
            dispatch({
                type: SET_CURRENT_INGREDIENT,
                data
            });
        }
    },[allIngredientsData])

    return (
        <div>
            <div className={styles.inner}>
                <IngredientDetails/>
            </div>
        </div>
    );
}

export default IngredientDetailsPage;
