import { useAuth } from '../services/auth';
import { Redirect, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector} from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
    let { signIn, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const notAllowedForAuthUser = ['/login', '/register', '/forgot-password', '/reset-password'];
    const notAllowedForNotAuthUser = ['/profile'];

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

    useEffect(() => {
        user.email !== '' && setUserLoaded(true);
    }, [user]);


    return (
        <Route
            {...rest}
            render={({ location }) =>
            {
                if (isUserLoaded) {
                    if (notAllowedForAuthUser.filter(p => p === rest.path).length === 0) {
                        return (children)
                    } else {
                        return location.state.from.pathname ?
                            redirectTo(location.state.from.pathname, location) :
                            redirectTo('/', location);
                    }
                } else {
                    if (notAllowedForNotAuthUser.filter(p => rest.path.indexOf(p) !== -1).length === 0) {
                        return (children)
                    } else {
                        return redirectTo('/login', location);
                    }
                }
            }
            }
        />
    );
}