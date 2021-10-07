import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import React from 'react';
import {getUserRequest, loginRequest, logoutRequest, postRegister, refreshTokenRequest} from "./api";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [tokens, setTokens] = useState({
        accessToken: '',
        refreshToken: '',
    });

    // const getUser = async (email, password, name) => {
    //     return await postRegister(email, password, name)
    //         .then(data => {
    //             if (data.success) {
    //                 setUser({ email: email, password: password});
    //                 setTokens({
    //                     accessToken: data.accessToken.split('Bearer ')[1],
    //                     refreshToken: data.refreshToken})
    //                 if (tokens.refreshToken){
    //                     setCookie('token', tokens.refreshToken);
    //                 }
    //             }
    //             return data.success;
    //         });
    // };

    const getUser = async () => {
        return await getUserRequest()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser({ ...data});
                }
                return data.success;
            });
    };

    const signIn = async (user, tokens) => {
        return await loginRequest(user.email, user.password, tokens.accessToken)
            .then(data => {
                if (data.success) {
                    setTokens({
                        accessToken: data.accessToken.split('Bearer ')[1],
                        refreshToken: data.refreshToken
                    })
                }

                return data.success;
            })
    };

    const refreshToken = async (tokens) => {
        return await refreshTokenRequest(tokens.refreshToken)
            .then(data => {
                if (data.success) {
                    setTokens({
                        accessToken: data.accessToken.split('Bearer ')[1],
                        refreshToken: data.refreshToken
                    })
                }

                return data.success;
            })
    }

    const signOut = async (tokens) => {
        await logoutRequest(tokens.refreshToken);
        setUser(null);
        deleteCookie('token');
    };

    return {
        user,
        tokens,
        getUser,
        signIn,
        refreshToken,
        signOut
    };
}
