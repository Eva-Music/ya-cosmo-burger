import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {ADD_CURRENT_ORDER_INGREDIENTS, getListIngredients} from "../../services/actions/order";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import style from "./main.module.css";
import AppHeader from "../header/AppHeader";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";

const MainPage = () => {

    const dispatch = useDispatch();

    const {
        allIngredientsData,
        modalOpen,
        modalContent,
        currentDragIngredient,
    } = useSelector(state => state.order);

    useEffect(
        () => {
            if (!allIngredientsData.length) dispatch(getListIngredients());
        },
        [dispatch]
    );

    const handleDrop = () => {
        const data = currentDragIngredient;
        dispatch({
            type: ADD_CURRENT_ORDER_INGREDIENTS,
            data
        });
    };

    const modal =
        <Modal isVisible={modalOpen}>
            {modalContent === 'ingredients' && <IngredientDetails/>}
            {modalContent === 'order' && <OrderDetails/>}
        </Modal>

    return (
        <div className={style.main}>
            <AppHeader/>
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