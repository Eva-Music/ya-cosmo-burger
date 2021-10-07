import { useAuth } from '../services/auth';
import { Redirect, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
    let { getUser, ...auth } = useAuth();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const notAllowedForAuthUser = ['/login', '/register', '/forgot-password', '/reset-password'];
    const notAllowedForNotAuthUser = ['/profile'];

    const init = async () => {
        await getUser();
        setUserLoaded(true);
    };

    const redirectTo = (to, location) => {
        return (<Redirect
            to={{
                pathname: to,
                state: {from: location}
            }}
        />)
    }

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (auth.user) {
                    if (notAllowedForAuthUser.filter(p => p === rest.path).length === 0) {
                        return children;
                    } else {
                        return redirectTo('/', location);
                    }
                } else {
                    if (notAllowedForNotAuthUser.filter(p => rest.path.indexOf(p) !== -1).length === 0) {
                        return children;
                    } else {
                        return redirectTo('/login', location);
                    }
                }
            }
            }
        />
    );
}