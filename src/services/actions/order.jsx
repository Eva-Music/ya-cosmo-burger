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