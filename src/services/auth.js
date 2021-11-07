import React, {createContext, useContext} from 'react';
import {useDispatch} from "react-redux";
import {
    forgotPassword,
    getUserData,
    logIn,
    logoutData,
    refreshTokenData,
    resetPassword,
    userRegister
} from "./actions/order";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {

    const dispatch = useDispatch();

    const register = async (email, name, password) => {
        const success = await dispatch(userRegister(email, password, name));
        console.log(success);
        return success
    };

    const refreshToken = async (token) => {
        const accessToken = await dispatch(refreshTokenData(token));
        console.log(accessToken);
        return accessToken;
    };

    const refreshUser = async (token) => {
        const accessToken = await dispatch(refreshTokenData(token));
        console.log(accessToken);
        const email = await dispatch(getUserData(accessToken));
        console.log(email);
        return email;
    };

    const getUser = async (accessToken) => {
        const email = await dispatch(getUserData(accessToken));
        console.log(email);
        return email;
    };

    const signIn = async (email, password) => {
        const success = await dispatch(logIn(email, password));
        console.log(success);
        return success
    };

    const signOut = async (refreshToken) => {
        const success = await dispatch(logoutData(refreshToken));
        console.log(success);
        return success
    };

    const resetUserPassword = async (password, code) => {
        const success = await dispatch(resetPassword(password, code));
        console.log(success);
        return success
    }

    const forgotUserPassword = async (email) => {
        const success = await dispatch(forgotPassword(email));
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
