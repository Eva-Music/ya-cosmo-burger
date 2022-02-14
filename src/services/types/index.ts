import { store } from '../store';
import { TUserState } from '../reducers/user';
import { TOrderState } from '../reducers/order';
import { TIngredientsState } from '../reducers/ingredients';

export type AppDispatch = typeof store.dispatch;
export type RootState = {
    user: TUserState;
    order: TOrderState;
    ingredients: TIngredientsState;
};
