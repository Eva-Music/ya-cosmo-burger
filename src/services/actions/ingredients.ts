import {
    getIngredientsRequest,
} from '../api';
import {
    GET_LIST_INGREDIENTS_FAILED,
    GET_LIST_INGREDIENTS_REQUEST,
    GET_LIST_INGREDIENTS_SUCCESS} from "../constants";
import {TIngredientsData} from "../types/data";


export interface IGetIngredientsAction {
    readonly type: typeof GET_LIST_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {}

export interface IGetIngredientsSuccessAction {
    readonly type: any;
    readonly ingredients: any;
}


export const getIngredientsAction = (): IGetIngredientsAction => ({
    type: GET_LIST_INGREDIENTS_REQUEST
});

export const getIngredientsSuccessAction = (
    ingredients: ReadonlyArray<TIngredientsData>
): IGetIngredientsSuccessAction => ({
    type: GET_LIST_INGREDIENTS_SUCCESS,
    ingredients
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_LIST_INGREDIENTS_FAILED
});

export const getIngredientsThunk: any = () => (dispatch: any) => {
    dispatch(getIngredientsAction());
    getIngredientsRequest().then(res => {
        if (res && res.success) {
            dispatch(getIngredientsSuccessAction(res.data));
        } else {
            dispatch(getIngredientsFailedAction());
        }
    });
};
