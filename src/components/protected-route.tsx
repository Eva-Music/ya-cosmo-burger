import {useAuth} from '../services/auth';
import {Redirect, Route} from 'react-router-dom';
import React, {FC, useEffect} from 'react';
import {useSelector} from "../services/hooks";
import { RouteProps } from 'react-router';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) =>  {
    let { refreshUser, ...auth } = useAuth();

    const store = useSelector(state => state);

    const {user} = store;

    const redirectTo = (to: string, location: any) => {
        return (<Redirect
            to={{
                pathname: to,
                state: {from: location}
            }}
        />)
    }

    useEffect(() => {
        console.log(user);
            if (!user.isUserAuth) {
                const token = window.localStorage.getItem('refreshToken');
                console.log(token);
                token && refreshUser(token);
            }
        }, []
    );

    useEffect(() => {
        console.log(user);
    }, [user.isUserAuth]);


    return (
        <Route
            {...rest}
            render={({ location }) =>
            {
                if (user.isUserAuth) {
                    // @ts-ignore
                    return location.state && location.state.from.pathname ?
                        // @ts-ignore
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