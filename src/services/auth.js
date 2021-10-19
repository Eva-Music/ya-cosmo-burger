import { useContext, createContext } from 'react';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserData, logIn, logoutData, refreshTokenData, userRegister} from "./actions/order";

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

    const {
        user,
    } = useSelector(state => state.order);

   const register = async () => {
       return dispatch(userRegister(user.email, user.password, user.name));
    }

    const getUser = async () => {
        dispatch(getUserData(user.accessToken))
    };

    const signIn = async () => {
        return dispatch(logIn(user.email, user.password));
    };

    const refreshToken = async () => {
        dispatch(refreshTokenData(user.refreshToken));
    }

    const signOut = async () => {
        dispatch(logoutData(user.refreshToken));
    };

    return {
        register,
        getUser,
        signIn,
        refreshToken,
        signOut
    };
}
