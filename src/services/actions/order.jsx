import {
    getIngredientsRequest,
    getOrderNumberRequest,
    getUserRequest,
    loginRequest,
    logoutRequest,
    postEmailToReset,
    postPasswordToReset,
    postRegister,
    refreshTokenRequest
} from '../api';

export const GET_LIST_INGREDIENTS_REQUEST = 'GET_LIST_INGREDIENTS_REQUEST';
export const GET_LIST_INGREDIENTS_SUCCESS = 'GET_LIST_INGREDIENTS_SUCCESS';
export const GET_LIST_INGREDIENTS_FAILED = 'GET_LIST_INGREDIENTS_FAILED';

export const CHANGE_CURRENT_ORDER_INGREDIENTS = 'CHANGE_CURRENT_ORDER_INGREDIENTS';
export const ADD_CURRENT_ORDER_INGREDIENTS = 'ADD_CURRENT_ORDER_INGREDIENTS';
export const DELETE_CURRENT_ORDER_INGREDIENTS = 'DELETE_CURRENT_ORDER_INGREDIENTS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const DELETE_CURRENT_INGREDIENT = 'DELETE_CURRENT_INGREDIENT';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER = 'DELETE_ORDER_NUMBER';
export const ADD_DRAG_INGREDIENT = 'ADD_DRAG_INGREDIENT';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const RESET_EMAIL_SUCCESS = 'RESET_EMAIL_SUCCESS';
export const RESET_EMAIL_FAILED = 'RESET_EMAIL_FAILED';

export const ORDER_PRICE = 'ORDER_PRICE';

export const SET_MODAL_STATUS = 'SET_MODAL_STATUS';

export const SET_USER_REGISTRY = 'SET_USER_REGISTRY';
export const CLEAN_USER = 'CLEAN_USER';
export const USER_ERROR = 'USER_ERROR';
export const SET_USER = 'SET_USER';
export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const AUTH_USER = 'AUTH_USER';

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
                    type: GET_LIST_INGREDIENTS_FAILED,
                    message: res.message
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_LIST_INGREDIENTS_FAILED,
                message: err.message
            });
        });
    };
}

export const getOrderNumber = (ingredients) => async (dispatch)  => {
    dispatch({
        type: GET_ORDER_NUMBER_REQUEST,
    });
    getOrderNumberRequest(ingredients).then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                value: res
            });
        } else {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED,
                message: res.message
            });
        }
    }).catch(err => {
        dispatch({
            type: GET_ORDER_NUMBER_FAILED,
            message: err.message
        });
    });
}

export const forgotPassword = (email) => async (dispatch) => {
    dispatch({
        type: RESET_REQUEST,
    });
    return await postEmailToReset(email).then(res => {
        if (res) {
            dispatch({
                type: RESET_EMAIL_SUCCESS,
                value: res.success
            })
        }
        return res.success;
    }).catch(err => {
        dispatch({
            type: RESET_EMAIL_FAILED,
        });
    })
}

export const resetPassword = (password, code) => async (dispatch) => {
    dispatch({
        type: RESET_REQUEST,
    });
    return await postPasswordToReset(password, code).then(res => {
        if (res) {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                value: res.success
            })
        }
        return res.success;
    }).catch(err => {
        dispatch({
            type: RESET_PASSWORD_FAILED,
        });
    })
}

export const userRegister = (email, password, name) => async (dispatch) => {
    return await postRegister(email, password, name).then(data => {
        if (data.success) {
            dispatch({
                type: SET_USER_LOGIN,
                email: email,
                password: password,
                refreshToken: data.refreshToken,
                accessToken: data.accessToken.split('Bearer ')[1],
                name: data.user.name
            })
            dispatch({
                type: USER_ERROR,
                value: false
            })
        }
        return data.success;
    }).catch(err => {
        dispatch({
            type: USER_ERROR,
            value: true
        })
    })
}

export const logIn = (email, password) => async (dispatch) => {
    return await loginRequest(email, password).then(data => {
        if (data.success) {
            dispatch({
                type: SET_USER_LOGIN,
                email: email,
                password: password,
                refreshToken: data.refreshToken,
                accessToken: data.accessToken.split('Bearer ')[1],
                name: data.user.name
            })
            dispatch({
                type: USER_ERROR,
                value: false
            })
            dispatch({
                type: AUTH_USER,
            })
        }
        return data.success;
    }).catch(err => {
        dispatch({
            type: USER_ERROR,
            value: true
        })
    })
}

export const getUserData = (token) => async (dispatch) => {
    return await getUserRequest(token)
        .then(data => {
            if (data.success) {
                console.log(data);
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                })
                dispatch({
                    type: AUTH_USER,
                })
            }
            return data.user.email;
        }).catch(err => {
            dispatch({
                type: USER_ERROR,
                value: true
            })
        });
}

export const refreshTokenData = (token) => async (dispatch) => {
    return await refreshTokenRequest(token)
        .then(data => {
            if (data.success) {
                // console.log(data);
                dispatch({
                    type: SET_USER_TOKEN,
                    refreshToken: data.refreshToken,
                    accessToken: data.accessToken.split('Bearer ')[1],
                })
            } else {
                window.localStorage.removeItem("refreshToken");
            }
            return data.accessToken.split('Bearer ')[1];
        }).catch(err => {
            dispatch({
                type: USER_ERROR,
                value: true
            })
        });
}

export const logoutData = (token) => async (dispatch) => {
    return await logoutRequest(token).then(data => {
        if (data.success) {
            dispatch({
                type: CLEAN_USER
            })
            dispatch({
                type: AUTH_USER,
            })
        }
        return data.success;
    }).catch(err => {
        dispatch({
            type: USER_ERROR,
            value: true
        })
    })
}