import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {
    ADD_CURRENT_ORDER_INGREDIENTS,
    DELETE_CURRENT_INGREDIENT, DELETE_ORDER_NUMBER,
} from "../../services/actions/order";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import style from "./main.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import { useHistory } from "react-router-dom";

const MainPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        modalOpen,
        modalContent,
        currentDragIngredient,
    } = useSelector(state => state.order);

    const handleDrop = () => {
        const data = currentDragIngredient;
        dispatch({
            type: ADD_CURRENT_ORDER_INGREDIENTS,
            data
        });
    };

    const onCLose = () => {
        dispatch({
            type: DELETE_CURRENT_INGREDIENT,
        });
        dispatch({
            type: DELETE_ORDER_NUMBER,
        });

        history.push('/');
    }

    const modal =
         <Modal isVisible={modalOpen} onClose={onCLose}>
            {modalContent === 'ingredients' && <IngredientDetails/>}

            {modalContent === 'order' && <OrderDetails/>}
        </Modal>

    return (
        <div className={style.main}>
            {modalOpen && modal}

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