import {orderReducer} from "./order";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    order: orderReducer
});