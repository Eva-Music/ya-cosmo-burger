import {orderReducer} from "./order";
import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {userReducer} from "./user";

export const rootReducer = combineReducers({
    order: orderReducer,
    ingredients: ingredientsReducer,
    user: userReducer
});