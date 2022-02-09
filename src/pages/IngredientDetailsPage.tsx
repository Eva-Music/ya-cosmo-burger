import React, {useEffect} from "react";
import IngredientDetails from "../components/details/IngredientDetails";
import styles from './ingredients.module.css';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "../services/hooks";
import {SET_CURRENT_INGREDIENT} from "../services/constants";

const IngredientDetailsPage = () => {

    let location = useLocation();
    const dispatch = useDispatch();

    const store = useSelector(state => state);

    const {order, ingredients} = store;

    useEffect(() => {
        if(!order.currentIngredient){
            const current = location.pathname.split("/")[2];
            const data = ingredients.allIngredientsData.filter(x => x._id === current)[0];
            dispatch({
                type: SET_CURRENT_INGREDIENT,
                data
            });
        }
    },[ingredients.allIngredientsData])

    return (
        <div>
            <div className={styles.inner}>
                <IngredientDetails/>
            </div>
        </div>
    );
}

export default IngredientDetailsPage;
