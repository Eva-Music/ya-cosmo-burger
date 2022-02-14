import React from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {
    ADD_CURRENT_ORDER_INGREDIENTS,
    DELETE_CURRENT_INGREDIENT, DELETE_ORDER_NUMBER,
} from "../../services/constants";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import style from "./main.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import { useHistory } from "react-router-dom";
import {Modal} from "../modal/Modal";

const MainPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector(state => state);

    const {order, user} = store;

    const handleDrop = () => {
        const data = order.currentDragIngredient;
        dispatch({
            type: ADD_CURRENT_ORDER_INGREDIENTS,
            data
        });
    };

    const onClose = () => {
        dispatch({
            type: DELETE_CURRENT_INGREDIENT,
        });
        dispatch({
            type: DELETE_ORDER_NUMBER,
        });

        history.push('/');
    }

    const modal =
         <Modal onClose={onClose}>
            {order.modalContent === 'ingredients' && <IngredientDetails/>}

            {order.modalContent === 'order' && <OrderDetails/>}
        </Modal>

    return (
        <div className={style.main}>
            {order.modalOpen && modal}

            <section className={style.mainSection}>
                <div className={style.main}>
                    <p className={`text_type_main-large m-10`}>
                        Соберите бургер
                    </p>
                    <DndProvider backend={HTML5Backend}>
                        <section className={style.mainContent}>
                            <div className={style.main}>
                                <BurgerIngredients/>
                            </div>
                            <div style={{alignSelf: "flex-start"}}>
                                <BurgerConstructor onDropHandler={handleDrop}/>
                            </div>
                        </section>
                    </DndProvider>

                </div>
            </section>
        </div>
    );
}

export default MainPage;