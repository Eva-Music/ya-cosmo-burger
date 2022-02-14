import {getOrderNumberRequest} from '../api';

import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS
} from "../constants";

import {TIngredientsData} from "../types/data";


export interface IGetOrderNumberAction {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberFailedAction {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
    readonly message?: string;
}

export interface IGetOrderNumberSuccessAction {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly value: number;
}


export const getOrderNumberAction = (): IGetOrderNumberAction => ({
    type: GET_ORDER_NUMBER_REQUEST
});

export const getOrderNumberSuccessAction = (value: number): IGetOrderNumberSuccessAction => ({
    type: GET_ORDER_NUMBER_SUCCESS,
    value: value
});

export const getOrderNumberFailedAction = (message?: string): IGetOrderNumberFailedAction => ({
    type: GET_ORDER_NUMBER_FAILED,
    message: message
});


export const getOrderNumberThunk = (ingredients: ReadonlyArray<TIngredientsData & { id: number }>) => (dispatch: any)  => {
    dispatch(getOrderNumberAction());
    console.log(ingredients);
    getOrderNumberRequest(ingredients).then(res => {
        console.log(res);
        if (res && res.success) {
            dispatch(getOrderNumberSuccessAction(res.order.number));
        } else {
            dispatch(getOrderNumberFailedAction(res.message));
        }
    }).catch(err => {
        dispatch(getOrderNumberFailedAction(err.message));
    })};
