import {TIngredientsCounter, TIngredientsData} from '../types/data';

import {
    ADD_CURRENT_ORDER_INGREDIENTS,
    ADD_DRAG_INGREDIENT,
    CHANGE_CURRENT_ORDER_INGREDIENTS,
    DELETE_CURRENT_INGREDIENT,
    DELETE_CURRENT_ORDER_INGREDIENTS,
    DELETE_ORDER_NUMBER,
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    ORDER_PRICE,
    SET_CURRENT_INGREDIENT,
    SET_MODAL_STATUS
} from '../constants';

export type TOrderState = {
    currentOrderIngredients: ReadonlyArray<TIngredientsData & { id: number }>;
    bun: TIngredientsData | null;
    currentDragIngredient: null;
    ingredientCounter: number;
    ingredientsCounter: ReadonlyArray<TIngredientsCounter>;
    modalOpen: boolean;
    modalContent: string;
    orderPrice: number;
    currentOrderNumber: number;
    orderPriceFailedMsg: string;
    currentIngredient: TIngredientsData | null;
};

const orderInitialState: TOrderState = {
    currentOrderIngredients: [],
    currentDragIngredient: null,
    ingredientCounter: 0,
    bun: null,

    ingredientsCounter: [],
    modalOpen: false,
    modalContent: '',
    orderPrice: 0,
    currentOrderNumber: 0,
    orderPriceFailedMsg: '',
    currentIngredient: null,
};

export const orderReducer = (state = orderInitialState, action: any): TOrderState => {
    switch (action.type) {
        case ADD_CURRENT_ORDER_INGREDIENTS: {
            return {
                ...state,
                currentDragIngredient: null,
                ingredientCounter: ++state.ingredientCounter,
                ingredientsCounter:
                    (state.currentOrderIngredients.length &&
                        state.ingredientsCounter.filter(x => x.id === action.data._id).length > 0) ?
                        [...state.ingredientsCounter].map(x =>
                            x.id === action.data._id ? {...x, count: ++x.count} : x
                        ) :
                        (action.data.type === 'bun' &&
                            state.ingredientsCounter.filter(x => x.isBun).length !== 0) ?
                            [...state.ingredientsCounter.map(x => x.isBun ? {id: action.data._id,
                                count: 2, isBun: true} : x)]
                            :
                            [...state.ingredientsCounter,
                                {id: action.data._id, isBun: action.data.type === 'bun',
                                    count: action.data.type === 'bun' ? 2 : 1}],

                bun:
                    action.data.type === 'bun' ? action.data : state.bun,

                currentOrderIngredients:
                    action.data.type !== 'bun' ? [...state.currentOrderIngredients,
                            {...action.data, id: state.ingredientCounter }] :
                        [...state.currentOrderIngredients]
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
                modalContent: 'ingredients',
                currentIngredient: action.data
            }
        }
        case SET_MODAL_STATUS: {
            return {
                ...state,
                modalOpen: action.status
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
                currentOrderNumber: action.value,
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
            const bunPrice = state.bun ? (state.bun.price * 2) : 0;
            const mainPrice = state.currentOrderIngredients.length !== 0 ?
                (state.currentOrderIngredients.map(x => x.price)
                    .reduce((x, y) => x + y, 0)) : 0;
            const finalPrice = bunPrice + mainPrice;
            return {
                ...state,
                orderPrice: finalPrice
            }
        }

        default: {
            return state;
        }
    }
};