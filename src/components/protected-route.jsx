import {useAuth} from '../services/auth';
import {Redirect, Route} from 'react-router-dom';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
    let { refreshUser, ...auth } = useAuth();

    const {
        isUserAuth
    } = useSelector(state => state.order);

    const redirectTo = (to, location) => {
        return (<Redirect
            to={{
                pathname: to,
                state: {from: location}
            }}
        />)
    }

    useEffect(() => {
            if (!isUserAuth) {
                const token = window.localStorage.getItem('refreshToken');
                token && refreshUser(token);
            }
        }, []
    );

    useEffect(() => {
        console.log(isUserAuth);
    }, [isUserAuth]);

    return (
        <Route
            {...rest}
            render={({ location }) =>
            {
                if (isUserAuth) {
                    return location.state && location.state.from.pathname ?
                        redirectTo(location.state.from.pathname, location) :
                        children;
                } else {
                    return redirectTo('/login', location);
                }
            }
            }
        />
    );
}