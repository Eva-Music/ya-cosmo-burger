import {
    getUserRequest,
    loginRequest,
    logoutRequest,
    postEmailToReset,
    postPasswordToReset,
    postRegister,
    refreshTokenRequest
} from '../api';

import {TUser} from "../types/data";

import {
    AUTH_USER,
    CLEAN_USER,
    RESET_EMAIL_FAILED,
    RESET_EMAIL_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    SET_USER,
    SET_USER_LOGIN,
    SET_USER_TOKEN,
    USER_ERROR,
    USER_REQUEST,
    TOKEN_REQUEST,
    RESET_REQUEST,
    LOGOUT_REQUEST
} from '../constants';


export interface IResetAction {
    readonly type: typeof RESET_REQUEST;
}

export const resetAction = (): IResetAction => ({
    type: RESET_REQUEST
});


export interface IResetEmailFailedAction {
    readonly type: typeof RESET_EMAIL_FAILED;
}

export interface IResetEmailSuccessAction {
    readonly type: typeof RESET_EMAIL_SUCCESS;
    readonly value: boolean;
}

export const resetEmailSuccessAction = (
    value: boolean
): IResetEmailSuccessAction => ({
    type: RESET_EMAIL_SUCCESS,
    value
});

export const resetEmailFailedAction = (): IResetEmailFailedAction => ({
    type: RESET_EMAIL_FAILED
});


export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly value: boolean;
}

export const resetPasswordSuccessAction = (
    value: boolean
): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
    value
});

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
});

export interface ILogoutAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export const logoutAction = (): ILogoutAction => ({
    type: LOGOUT_REQUEST
});

export interface IUserRequestAction {
    readonly type: typeof USER_REQUEST;
}

export const userRequestAction = (): IUserRequestAction => ({
    type: USER_REQUEST
});

export interface IUserRequestFailedAction {
    readonly type: typeof USER_ERROR;
    readonly value: boolean;
}

export const userRequestFailedAction = (value: boolean): IUserRequestFailedAction => ({
    type: USER_ERROR,
    value
});

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly email: string;
    readonly name: string;
}

export const setUserSuccessAction = (user: Omit<TUser, 'password' | 'accessToken' | 'refreshToken'>)
    : ISetUserAction => ({
    type: SET_USER,
    email: user.email,
    name: user.name
});

export interface ISetUserLoginAction {
    readonly type: typeof SET_USER_LOGIN;
    readonly email: string;
    readonly password: string;
    readonly refreshToken: string;
    readonly accessToken: string;
    readonly name: string;
}

export const setUserLoginSuccessAction = (email: string, password: string,
                                          data: any): ISetUserLoginAction => ({
    type: SET_USER_LOGIN,
    email: email,
    password: password,
    refreshToken: data.refreshToken,
    accessToken: data.accessToken.split('Bearer ')[1],
    name: data.user.name
});


export interface IAuthUserAction {
    readonly type: typeof AUTH_USER;
}
export const authUserAction = (): IAuthUserAction => ({
    type: AUTH_USER
});


export interface ICleanUserAction {
    readonly type: typeof CLEAN_USER;
}
export const cleanUserAction = (): ICleanUserAction => ({
    type: CLEAN_USER
});


export interface ITokenAction {
    readonly type: typeof TOKEN_REQUEST;
}

export const tokenAction = (): ITokenAction => ({
    type: TOKEN_REQUEST
});

export interface ISetUserTokenAction {
    readonly type: typeof SET_USER_TOKEN;
    readonly accessToken: string;
    readonly refreshToken: string;
}

export const setUserTokenSuccessAction = (refreshToken: string, accessToken: string)
    : ISetUserTokenAction => ({
    type: SET_USER_TOKEN,
    refreshToken: refreshToken,
    accessToken: accessToken,
});


export const resetEmailThunk: any = (email: string) => async (dispatch: any) => {
    dispatch(resetAction());
    return await postEmailToReset(email).then(res => {
        if (res && res.success) {
            dispatch(resetEmailSuccessAction(res.success))
        } else {
            dispatch(resetEmailFailedAction())
        }
        return res.success;
    }).catch(err => {
        dispatch(resetEmailFailedAction())
    })
}

export const resetPasswordThunk: any = (password: string, code: string) => async (dispatch: any) => {
    dispatch(resetAction());
    return await postPasswordToReset(password, code).then(res => {
        if (res && res.success) {
            dispatch(resetPasswordSuccessAction(res.success))
        } else {
            dispatch(resetPasswordFailedAction())
        }
        return res.success;
    }).catch(err => {
        dispatch(resetPasswordFailedAction())
    })
}

export const userRegisterThunk: any =
    (email: string, name: string, password: string) => async (dispatch: any) => {
    dispatch(userRequestAction());
    return await postRegister(email, name, password).then(res => {
        if (res && res.success) {
            dispatch(setUserLoginSuccessAction(email, password, res))
            dispatch(userRequestFailedAction(false))
            dispatch(authUserAction());
        } else {
            dispatch(userRequestFailedAction(true))
        }
        return res.success;
    }).catch(err => {
        dispatch(userRequestFailedAction(true));
    })}

export const loginThunk: any = (email: string, password: string) => async (dispatch: any) => {
    dispatch(userRequestAction());
    return await loginRequest(email, password).then(res => {
        if (res && res.success) {
            dispatch(setUserLoginSuccessAction(email, password, res));
            dispatch(userRequestFailedAction(false));
            dispatch(authUserAction());
        } else {
            dispatch(userRequestFailedAction(true));
        }
        return res.success;
    }).catch(err => {
        dispatch(userRequestFailedAction(true));
    })}

export const getUserDataThunk: any = (token: string) => async (dispatch: any) => {
    dispatch(userRequestAction());
    return await getUserRequest(token).then(res => {
        if (res && res.success) {
            dispatch(setUserSuccessAction(res.user))
            dispatch(authUserAction())
        } else {
            dispatch(userRequestFailedAction(true))
        }
        console.log(res);
        return res.user.email;
    }).catch(err => {
        dispatch(userRequestFailedAction(true));
    })}

export const refreshTokenDataThunk: any = (token: string) => async (dispatch: any) => {
    dispatch(tokenAction());
    return await refreshTokenRequest(token).then(res => {
        if (res && res.success) {
            window.localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(setUserTokenSuccessAction(res.refreshToken,
                    res.accessToken.split('Bearer ')[1]));
            return res.accessToken.split('Bearer ')[1];
        } else {
            dispatch(userRequestFailedAction(true))
            return res.success;
        }
    }).catch(err => {
        dispatch(userRequestFailedAction(true));
        window.localStorage.removeItem("refreshToken");
        return false;
    })
}

export const logoutDataThunk: any = (token: string) => async (dispatch: any) => {
    dispatch(logoutAction());
    return await logoutRequest(token).then(res => {
        if (res && res.success) {
            dispatch(cleanUserAction());
            dispatch(authUserAction());
        } else {
            window.localStorage.removeItem("refreshToken");
            dispatch(userRequestFailedAction(true));
        }
        return res.success;
    }).catch(err => {
        dispatch(userRequestFailedAction(true));
    })
}