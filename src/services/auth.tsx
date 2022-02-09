import React, {createContext, ProviderProps, ReactNode, useContext} from 'react';
import {useDispatch} from "react-redux";
import {
    getUserDataThunk,
    loginThunk, logoutDataThunk,
    refreshTokenDataThunk,
    resetEmailThunk,
    resetPasswordThunk,
    userRegisterThunk
} from "./actions/user";


type Props = {
    children: ReactNode;
};

export type TProviderAuth = {
    refreshUser: (token: string) => Promise<any>;
    register: (email: string, name: string, password: string) => Promise<any>;
    getUser: (accessToken: string) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    refreshToken: (token: string) => Promise<any>;
    signOut: (refreshToken: string) => Promise<any>;
    resetUserPassword: (password: string, code: string) => Promise<any>;
    forgotUserPassword: (email: string) => Promise<any>;
}

// @ts-ignore
const AuthContext = createContext<TProviderAuth>(undefined);

export function ProvideAuth({ children }: Props) {
    const auth = useProvideAuth();

    return (<AuthContext.Provider value={auth}> {children} </AuthContext.Provider>)
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth(): TProviderAuth {

    const dispatch = useDispatch();

    const register = async (email: string, name: string, password: string) => {
        console.log(email, name, password)
        const success = await dispatch(userRegisterThunk(email, name, password));
        console.log(success);
        return success
    };

    const refreshToken: (token: string) => Promise<any> = async (token: string) => {
        const accessToken = await dispatch(refreshTokenDataThunk(token));
        console.log(accessToken);
        return accessToken;
    };

    const refreshUser: (token: string) => Promise<any> = async (token: string) => {
        const accessToken = await dispatch(refreshTokenDataThunk(token));
        console.log(accessToken);
        if (accessToken) {
            return getUser(accessToken);
        }
    };

    const getUser = async (accessToken: string) => {
        const email = await dispatch(getUserDataThunk(accessToken));
        console.log(email);
        return email;
    };

    const signIn = async (email: string, password: string) => {
        const success = await dispatch(loginThunk(email, password));
        console.log(success);
        return success
    };

    const signOut = async (refreshToken: string) => {
        const success = await dispatch(logoutDataThunk(refreshToken));
        console.log(success);
        return success
    };

    const resetUserPassword = async (password: string, code: string) => {
        const success = await dispatch(resetPasswordThunk(password, code));
        console.log(success);
        return success
    }

    const forgotUserPassword = async (email: string) => {
        const success = await dispatch(resetEmailThunk(email));
        console.log(success);
        return success
    }

    return {
        refreshUser,
        register,
        getUser,
        signIn,
        refreshToken,
        signOut,
        resetUserPassword,
        forgotUserPassword
    };
}
