import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import AppHeader from "../header/AppHeader";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";
import {IngredientsContext} from "../../services/burgerIngredients"
const url = 'https://norma.nomoreparties.space/api/ingredients';
const url_orders = 'https://norma.nomoreparties.space/api/orders';

function App() {
    const [state, setState] = useState({
        productData: null,
        loading: true,
        ingredients: {
            isOn: false,
            content: []
        },
        orders: {
            isOn: false,
            ingredients: [],
            number: 0
        }
    })

    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        try {
            const getProductData = async () => {
                setState({...state, loading: true});
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Server response not ok.');
                }
                const data = await res.json();
                if (data.success) {
                    setState({ ...state, productData: data.data, loading: false });
                } else {
                    throw new Error('Data success is false.');
                }
            }
            getProductData();
        } catch (error) {
            console.log('Возникла проблема с вашим fetch запросом: ', error.message);
        }
    }, [])

    const handleModalOpen = () => {
        setModalVisible(true);
    }

    const handleModalClose = () => {
        setState({...state,
            ingredients: {...state.ingredients, isOn: false},
            orders: {...state.orders, isOn: false}});

        setModalVisible(false);
    }

    const handleIngredientContent = (data) => {
        let newContent = [...state.ingredients.content];
        if (data.type === 'bun' && newContent.filter(x => x.type === 'bun').length === 1){
            newContent = newContent.filter(x => x.type !== 'bun');
        }
        setState({
            ...state,
            ingredients: {isOn: true, content: newContent.concat(data)}
        });
    }

    const handleOrderContentClose = (item) => {
        let newContent = [...state.ingredients.content];
        newContent = newContent.filter(x => x._id !== item._id);

        setState({
            ...state,
            ingredients: {isOn: true, content: newContent}
        });
    }

    const handleOrderContent = () => {
        try {
            const getOrderNumber = async () => {
                const res = await fetch(url_orders, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"ingredients": state.ingredients.content.map(d => d._id)})
                });

                if (!res.ok) {
                    throw new Error('Server response not ok.');
                }

                let result = await res.json();
                if (result.success) {
                    setState({
                        ...state,
                        orders: {isOn: true, ingredients: [], number: result.order.number}
                    });
                }
            }
            getOrderNumber();
        } catch (error) {
            console.log('Возникла проблема с вашим fetch запросом: ', error.message);
        }
    }

    const modal =
        <Modal onClose={handleModalClose} isVisible={isModalVisible}>
                {state.ingredients.isOn && <IngredientDetails data={state.ingredients.content.concat().pop()}/>}
                {state.orders.isOn && <OrderDetails number={state.orders.number}/>}
        </Modal>

    return (
    <div className="App">
        <AppHeader />
        {isModalVisible && modal}

        <section className={"main-section"}>
            <div className="App">
                <p className="text_type_main-large m-10">
                    Соберите бургер
                </p>
                <section className={"main-content"}>
                    <IngredientsContext.Provider value={{state, setState}}>
                        <div className="App">
                            <BurgerIngredients ingredientContent={handleIngredientContent} modalOpen={handleModalOpen}/>
                        </div>
                        <div style={{alignSelf: "flex-start"}}>
                            <BurgerConstructor contentClose={handleOrderContentClose} orderContent={handleOrderContent} modalOpen={handleModalOpen}/>
                        </div>
                    </IngredientsContext.Provider>
                </section>
            </div>
        </section>
    </div>
  );
}

export default App;