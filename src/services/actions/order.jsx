import { getIngredientsRequest, getOrderNumberRequest } from '../api';

export const GET_LIST_INGREDIENTS_REQUEST = 'GET_LIST_INGREDIENTS_REQUEST';
export const GET_LIST_INGREDIENTS_SUCCESS = 'GET_LIST_INGREDIENTS_SUCCESS';
export const GET_LIST_INGREDIENTS_FAILED = 'GET_LIST_INGREDIENTS_FAILED';

export const ADD_CURRENT_ORDER_INGREDIENTS = 'ADD_CURRENT_ORDER_INGREDIENTS';
export const DELETE_CURRENT_ORDER_INGREDIENTS = 'DELETE_CURRENT_ORDER_INGREDIENTS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';

export const ORDER_PRICE = 'ORDER_PRICE';

export function getListIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_LIST_INGREDIENTS_REQUEST
        });
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_LIST_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                });
            } else {
                dispatch({
                    type: GET_LIST_INGREDIENTS_FAILED
                });
            }
        });
    };
}


export function getOrderNumber(ingredients) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
            ingredients
        });
        getOrderNumberRequest(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    value: { ...res, ingredients }
                });
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                });
            }
        });
    };
}