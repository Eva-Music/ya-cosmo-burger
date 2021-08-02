import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "../header/AppHeader";
import BurgerIngredients from "../ingredients/BurgerIngredients";
import BurgerConstructor from "../constructor/BurgerConstructor";
import ModalOverlay from "../modal/ModalOverlay";
import Modal from "../modal/Modal";
import IngredientDetails from "../details/IngredientDetails";
import OrderDetails from "../details/OrderDetails";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
    const [state, setState] = useState({
        productData: null,
        loading: true,
        ingredients: {
            isOn: false,
            content: null
        },
        orders: {
            isOn: false,
            content: null
        }
    })

    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const getProductData = async () => {
            setState({...state, loading: true});
            const res = await fetch(url);
            const data = await res.json();
            data.success &&
            setState({ ...state, productData: data.data, loading: false });
        }
        getProductData();
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
        setState({...state,
            ingredients: {isOn: true, content: data}});
    }

    const handleOrderContent = () => {
        setState({...state,
            orders: {isOn: true, content: getOrderUuid()}});
    }

    const getOrderUuid = () => {
        return 'xxxxxx'.replace(/[x]/g, (c) => {
            let r = Math.random() * 6 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(6);
        });
    }

    const modal =
         <ModalOverlay onClose={handleModalClose} isVisible={isModalVisible}>
                <Modal>
                    {state.ingredients.isOn && <IngredientDetails data={state.ingredients.content}/>}
                    {state.orders.isOn && <OrderDetails uuid={state.orders.content}/>}
                </Modal>
        </ModalOverlay>

    return (
    <div className="App">
        <AppHeader />
        {console.log(getOrderUuid())}
        {isModalVisible && modal}

        <section className={"main-section"}>
            <div className="App">
                <p className="text_type_main-large m-10">
                    Соберите бургер
                </p>
                <section className={"main-content"}>
                    <div className="App">
                        <BurgerIngredients ingredientContent={handleIngredientContent} modalOpen={handleModalOpen} data={state.productData}/>
                    </div>
                    <div style={{alignSelf: "flex-start"}}>
                        <BurgerConstructor orderContent={handleOrderContent} modalOpen={handleModalOpen} data={state.productData}/>
                    </div>
                </section>
            </div>
        </section>
    </div>
  );
}

export default App;