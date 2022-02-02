import {TUser} from '../types/data';

import {
    AUTH_USER,
    CLEAN_USER,
    RESET_EMAIL_FAILED,
    RESET_EMAIL_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    RESET_REQUEST,
    SET_USER,
    SET_USER_LOGIN,
    SET_USER_REGISTRY,
    SET_USER_TOKEN,
    USER_ERROR
} from '../constants';

export type TUserState = {
    resetLoading: boolean,
    resetPasswordSuccess: undefined,
    resetPasswordFailed: undefined,

    resetEmailSuccess: undefined,
    resetEmailFailed: undefined,
    user: TUser,
    userError: boolean,
    isUserAuth: boolean,
}
const userInitialState = {
    resetLoading: true,
    resetPasswordSuccess: undefined,
    resetPasswordFailed: undefined,

    resetEmailSuccess: undefined,
    resetEmailFailed: undefined,

    user: {
        name: '',
        email: '',
        password: '',
        accessToken: '', // используется в запросах к эндпоинту auth/user для получения и обновления
        // данных пользователя. Передавайте accessToken в заголовке authorization.
        // Срок жизни токена — 20 минут.
        refreshToken: '' //сохраняйте в localStorage или в куки. Токен используется
        // для выхода из системы и для получения нового accessToken,
        // если последний перестал подходить и просрочился.
    },
    userError: false,
    isUserAuth: false,
};


export const userReducer = (state = userInitialState, action: any): TUserState => {
    switch (action.type) {

        case SET_USER_LOGIN: {
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.email,
                    password: action.password,
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken,
                    name: action.name
                }
            }
        }
        case AUTH_USER: {
            return {
                ...state,
                isUserAuth: !state.isUserAuth
            }
        }

        case SET_USER_REGISTRY: {
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken,
                    name: action.name
                }
            }
        }

        case SET_USER_TOKEN: {
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken,
                }
            }
        }

        case SET_USER: {
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.name,
                    email: action.email,
                    password: action.password
                }
            }
        }
        case CLEAN_USER: {
            return {
                ...state,
                user: {}
            }
        }
        case USER_ERROR: {
            return {
                ...state,
                userError: action.value
            }
        }


        case RESET_REQUEST: {
            return {
                ...state,
                resetLoading: true,
                resetPasswordSuccess: undefined,
                resetPasswordFailed: undefined,
                resetEmailSuccess: undefined,
                resetEmailFailed: undefined
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: action.value,
                resetLoading: false
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetLoading: false
            }
        }

        case RESET_EMAIL_SUCCESS: {
            return {
                ...state,
                resetEmailSuccess: action.value,
                resetLoading: false
            }
        }
        case RESET_EMAIL_FAILED: {
            return {
                ...state,
                resetEmailFailed: true,
                resetLoading: false
            }
        }
        default: {
            return state;
        }
    }
};