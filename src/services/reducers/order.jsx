import {
    DELETE_CURRENT_INGREDIENT,
    SET_CURRENT_INGREDIENT,

    CHANGE_CURRENT_ORDER_INGREDIENTS,
    ADD_CURRENT_ORDER_INGREDIENTS,
    DELETE_CURRENT_ORDER_INGREDIENTS,

    GET_LIST_INGREDIENTS_FAILED,
    GET_LIST_INGREDIENTS_REQUEST,
    GET_LIST_INGREDIENTS_SUCCESS,

    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,

    ORDER_PRICE,
    DELETE_ORDER_NUMBER,

    ADD_DRAG_INGREDIENT
} from '../actions/order';

const initialState = {
    allIngredientsData: [],
    loading: false,
    allIngredientsFailToLoad: false,
    allIngredientsFailedMsg: '',
    currentOrderIngredients: [],
    ingredientsCounter: [{
        id: 0,
        count: 0,
        isBun: false,
    }],
    currentIngredient: null,
    modalOpen: false,
    modalContent: '',
    currentDragIngredient: null,
    orderPrice: 0,
    currentOrderNumber: 0,
    orderPriceFailedMsg: ''
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CURRENT_ORDER_INGREDIENTS: {
            return {
                ...state,
                currentDragIngredient: null,
                ingredientsCounter:
                    (state.currentOrderIngredients.length &&
                    state.ingredientsCounter.filter(x => x.id === action.data._id && !x.isBun).length > 0) ?
                    [...state.ingredientsCounter].map(x =>
                        x.id === action.data._id ? {...x, count: ++x.count} : x
                    ) :
                        (action.data.type === 'bun' &&
                            state.ingredientsCounter.filter(x => x.isBun).length !== 0) ?
                            [...state.ingredientsCounter.map(x => x.isBun ? {...x.count, id: action.data._id,
                                count: 2, isBun: true} : x)]
                            :
                    [...state.ingredientsCounter,
                        {id: action.data._id, isBun: action.data.type === 'bun',
                            count: action.data.type === 'bun' ? 2 : 1}],

                currentOrderIngredients:
                    (action.data.type === 'bun' &&
                    state.currentOrderIngredients.filter(x => x.type === 'bun').length > 0) ?
                        [...state.currentOrderIngredients.map(x => x.type === 'bun' ? action.data : x)] :
                        [...state.currentOrderIngredients, action.data]
            }
        }

        case CHANGE_CURRENT_ORDER_INGREDIENTS: {
            const newIngredients = [...state.currentOrderIngredients];
            const [ dragIndex, hoverIndex ] = [action.dragIndex, action.hoverIndex];
            newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, state.currentOrderIngredients[dragIndex]);
            return { ...state, currentOrderIngredients: newIngredients };
        }

        case DELETE_CURRENT_ORDER_INGREDIENTS: {
            const newArr = state.currentOrderIngredients.filter((_, index) => index !== action.index);
            const newCounter = state.ingredientsCounter.filter(x => x.id === action.itemId ?
                {...x, count: --x.count} : x)
            return {...state, currentOrderIngredients: newArr, ingredientsCounter: newCounter};
        }

        case ADD_DRAG_INGREDIENT: {
           return {
               ...state,
               currentDragIngredient: action.data
           }
        }

        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                modalOpen: true,
                modalContent: 'ingredients',
                currentIngredient: action.data
            }
        }
        case DELETE_CURRENT_INGREDIENT: {
            return {
                ...state,
                modalOpen: false,
                modalContent: '',
                currentIngredient: null
            }
        }

        case GET_LIST_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case GET_LIST_INGREDIENTS_SUCCESS: {
            return {...state,
                loading: false,
                allIngredientsData: action.ingredients
            };
        }
        case GET_LIST_INGREDIENTS_FAILED: {
            return {
                ...state,
                allIngredientsFailToLoad: true,
                loading: false,
                allIngredientsFailedMsg: action.message
            };
        }
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                modalOpen: true
            }
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                modalOpen: true,
                modalContent: 'order',
                currentOrderNumber: action.value.order.number,
            }
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                modalOpen: false,
                currentOrderNumber: 0,
                orderPriceFailedMsg: action.message
            }
        }
        case DELETE_ORDER_NUMBER: {
            return {
                ...state,
                modalOpen: false,
                modalContent: '',
                currentOrderNumber: 0
            }
        }
        case ORDER_PRICE: {
            return {
                ...state,
                orderPrice: state.currentOrderIngredients.length !== 0 ?
                    state.currentOrderIngredients.map(x => x.price)
                        .reduce((x, y) => x + y, 0) +
                    ((state.currentOrderIngredients.filter(x => x.type === 'bun').length === 1) ?
                    state.currentOrderIngredients.filter(x => x.type === 'bun')[0].price : 0) : 0
            }
        }
        default: {
            return state;
        }
    }
};