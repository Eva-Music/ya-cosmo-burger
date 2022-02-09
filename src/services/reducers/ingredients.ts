import {TIngredientsData} from '../types/data';

import {GET_LIST_INGREDIENTS_FAILED,
    GET_LIST_INGREDIENTS_REQUEST,
    GET_LIST_INGREDIENTS_SUCCESS} from '../constants';

export type TIngredientsState = {
    allIngredientsData: ReadonlyArray<TIngredientsData>;
    loading: boolean;
    allIngredientsFailToLoad: boolean;
    allIngredientsFailedMsg: string;
}

const ingredientsInitialState: TIngredientsState = {
    allIngredientsData: [],
    loading: false,
    allIngredientsFailToLoad: false,
    allIngredientsFailedMsg: '',
};

export const ingredientsReducer = (state = ingredientsInitialState, action: any): TIngredientsState => {
    switch (action.type) {
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

        default: {
            return state;
        }
    }
};