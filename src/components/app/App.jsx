import React, {useCallback, useEffect} from 'react';
import './App.css';
import AppHeader from "../header/AppHeader";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_CURRENT_ORDER_INGREDIENTS, ADD_INDEX, CHANGE_CURRENT_ORDER_INGREDIENTS,
    getListIngredients,
} from "../../services/actions/order";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();

    const {
        allIngredientsData,
        modalOpen,
        modalContent,
        currentDragIngredient,
        currentOrderIngredients
    } = useSelector(state => state.order);

    useEffect(
        () => {
            if (!allIngredientsData.length) dispatch(getListIngredients());
        },
        [dispatch]
    );

    const handleDrop = (id) => {
        const data = currentDragIngredient;
        const uuid = getOrderUuid();
        dispatch({
            type: ADD_CURRENT_ORDER_INGREDIENTS,
            data, uuid
        });
    };

    function getOrderUuid() {
        return 'xxxxxx'.replace(/[x]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const modal =
        <Modal isVisible={modalOpen}>
                {modalContent === 'ingredients' && <IngredientDetails/>}
                {modalContent === 'order' && <OrderDetails/>}
        </Modal>

    return (
    <div className="App">
        <AppHeader />
        {modalOpen && modal}

        <section className={"main-section"}>
            <div className="App">
                <p className="text_type_main-large m-10">
                    Соберите бургер
                </p>
                <DndProvider backend={HTML5Backend}>
                    <section className={"main-content"}>
                        <div className="App">
                            <BurgerIngredients />
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

export default App;