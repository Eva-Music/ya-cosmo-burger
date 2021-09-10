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
import {getListIngredients} from "../../services/actions/order";
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
        currentIngredient,
        currentOrderNumber
    } = useSelector(state => state.order);

    useEffect(
        () => {
            if (!allIngredientsData.length) dispatch(getListIngredients());
        },
        [dispatch]
    );

    // const [isModalVisible, setModalVisible] = useState(false);

    // useEffect(() => {
    //     try {
    //         const getProductData = async () => {
    //             setState({...state, loading: true});
    //             const res = await fetch(url);
    //             if (!res.ok) {
    //                 throw new Error('Server response not ok.');
    //             }
    //             const data = await res.json();
    //             if (data.success) {
    //                 setState({ ...state, productData: data.data, loading: false });
    //             } else {
    //                 throw new Error('Data success is false.');
    //             }
    //         }
    //         getProductData();
    //     } catch (error) {
    //         console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    //     }
    // }, [])

    // const handleModalOpen = () => {
    //     setModalVisible(true);
    // }

    // const handleModalClose = () => {
    //     setState({...state,
    //         ingredients: {...state.ingredients, isOn: false},
    //         orders: {...state.orders, isOn: false}});
    //
    //     setModalVisible(false);
    // }

    // const handleIngredientContent = (data) => {
    //     let newContent = [...state.ingredients.content];
    //     if (data.type === 'bun' && newContent.filter(x => x.type === 'bun').length === 1){
    //         newContent = newContent.filter(x => x.type !== 'bun');
    //     }
    //     setState({
    //         ...state,
    //         ingredients: {isOn: true, content: newContent.concat(data)}
    //     });
    // }


    // const handleOrderContent = () => {
    //     try {
    //         const getOrderNumber = async () => {
    //             const res = await fetch(url_orders, {
    //                 method: 'POST',
    //                 headers: {'Content-Type': 'application/json'},
    //                 body: JSON.stringify({"ingredients": state.ingredients.content.map(d => d._id)})
    //             });
    //
    //             if (!res.ok) {
    //                 throw new Error('Server response not ok.');
    //             }
    //
    //             let result = await res.json();
    //             if (result.success) {
    //                 setState({
    //                     ...state,
    //                     orders: {isOn: true, ingredients: [], number: result.order.number}
    //                 });
    //             }
    //         }
    //         getOrderNumber();
    //     } catch (error) {
    //         console.log('Возникла проблема с вашим fetch запросом: ', error.message);
    //     }
    // }

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
                        <BurgerIngredients/>
                    </div>
                    <div style={{alignSelf: "flex-start"}}>
                        <BurgerConstructor/>
                    </div>
                </section>
            </div>
        </section>
    </div>
  );
}

export default App;