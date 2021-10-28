import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector} from "react-redux";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export function ProtectedRoute({ children, ...rest }) {
    let { signIn, refreshToken, getUser, ...auth } = useAuth();
    const [isUserAuth, setUserAuth] = useState(false);

    const notAllowedForAuthUser = ['/login', '/register', '/forgot-password', '/reset-password'];
    const notAllowedForNotAuthUser = ['/profile', '/reset-password'];

    const {
        user,
    } = useSelector(state => state.order);

    const redirectTo = (to, location) => {
        return (<Redirect
            to={{
                pathname: to,
                state: {from: location}
            }}
        />)
    }

    const init = async () => {
        const token = window.localStorage.getItem('refreshToken');
        token && await refreshToken(token);
    };

    const findUser = async () => {
        user.accessToken && await getUser();
    }

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        findUser();
    }, [user.accessToken]);

    useEffect(() => {
        user.email ? setUserAuth(true) : setUserAuth(false);
    }, [user.email])

    return (
        <Route
            {...rest}
            render={({ location }) =>
            {
                if (isUserAuth) {
                    if (notAllowedForAuthUser.filter(p => p === rest.path).length === 0) {
                        return (children)
                    } else {
                        return location.state && location.state.from.pathname ?
                            redirectTo(location.state.from.pathname, location) :
                            redirectTo('/', location);
                    }
                } else {
                    if (notAllowedForNotAuthUser.filter(p => rest.path.indexOf(p) !== -1).length === 0) {
                        // if (location.pathname === '/forgot-password'){
                            redirectTo(location.pathname, location);
                        // }
                        // return (children)
                    } else {
                        if (location.state &&
                            location.state.from.pathname === '/forgot-password' &&
                            location.pathname === '/reset-password'){
                            return (<ResetPasswordPage />);
                        }
                        return redirectTo('/login', location);
                    }
                }
            }
            }
        />
    );
}