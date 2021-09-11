import React, {useEffect} from 'react';
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
        dispatch({
            type: ADD_CURRENT_ORDER_INGREDIENTS,
            data
        });
    };

    const handleMoveImage = (dragIndex, hoverIndex) => {
            const draggedImage =  currentOrderIngredients[dragIndex];

            console.log(dragIndex,
                hoverIndex,
                draggedImage)

            dispatch({
                type: CHANGE_CURRENT_ORDER_INGREDIENTS,
                dragIndex,
                hoverIndex,
                draggedImage
            });

            currentOrderIngredients.forEach(x => console.log(x));
    };


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
                            <BurgerConstructor onMoveImage={handleMoveImage} onDropHandler={handleDrop}/>
                        </div>
                    </section>
                </DndProvider>

            </div>
        </section>
    </div>
  );
}

export default App;