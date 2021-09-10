import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import AppHeader from "../header/AppHeader";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import {IngredientsContext} from "../../services/burgerIngredients"
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_CURRENT_ORDER_INGREDIENTS,
    ADD_DRAG_INGREDIENT,
    getListIngredients,
    SET_CURRENT_INGREDIENT
} from "../../services/actions/order";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
const url = 'https://norma.nomoreparties.space/api/ingredients';
const url_orders = 'https://norma.nomoreparties.space/api/orders';

function App() {
    // const [state, setState] = useState({
    //     productData: null,
    //     loading: true,
    //     ingredients: {
    //         isOn: false,
    //         content: []
    //     },
    //     orders: {
    //         isOn: false,
    //         ingredients: [],
    //         number: 0
    //     }
    // })

    const dispatch = useDispatch();

    const {
        allIngredientsData,
        modalOpen,
        modalContent,
        currentDragIngredient
    } = useSelector(state => state.order);

    useEffect(
        () => {
            if (!allIngredientsData.length) dispatch(getListIngredients());
        },
        [dispatch]
    );

    const [elements, setElements] = React.useState([]);
    const [draggedElements, setDraggedElements] = React.useState([]);
    const [draggedElement, setDraggedElement] = React.useState({});

    const handleDrag = (e, data) => {
        e.preventDefault();
        dispatch({
            type: ADD_DRAG_INGREDIENT,
            data
        });
    };

    const handleDragOver = e => e.preventDefault();

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
    <div className="App">
        <AppHeader />
        {modalOpen && modal}

        <section className={"main-section"}>
            <div className="App">
                <p className="text_type_main-large m-10">
                    Соберите бургер
                </p>
                <section className={"main-content"}>
                    <div className="App">
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients onDragHandler={handleDrag} />
                        </DndProvider>
                    </div>
                    <div style={{alignSelf: "flex-start"}}>
                        <BurgerConstructor onDragOverHandler={handleDragOver} onDropHandler={handleDrop}/>
                    </div>
                </section>
            </div>
        </section>
    </div>
  );
}

export default App;