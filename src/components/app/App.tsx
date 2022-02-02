import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainPage from "../main/MainPage";
import {NotFound404} from "../../pages/NotFound404";
import SignInPage from "../../pages/SignInPage";
import RegistryPage from "../../pages/RegistryPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import {ProtectedRoute} from "../protected-route";
import {ProvideAuth} from '../../services/auth';
import IngredientDetailsPage from "../../pages/IngredientDetailsPage";
import AppHeader from "../header/AppHeader";
import {useDispatch, useSelector} from "react-redux";
import {getListIngredients} from "../../services/actions/order";

export default function App() {

    const dispatch = useDispatch();

    const {
        modalOpen,
        currentIngredient,
        allIngredientsData,
        user
    } = useSelector(state => state.order);

    useEffect(() => {
        if (!allIngredientsData.length) dispatch(getListIngredients());
    }, []);

    useEffect(() => {
        user.refreshToken && window.localStorage.setItem('refreshToken', user.refreshToken);
    }, [user.refreshToken]);

    return (
        <>

            <ProvideAuth>
                <Router>
                    <AppHeader/>
                    <Switch>
                        <Route path="/" exact={true}>
                            <MainPage/>
                        </Route>
                        <Route path="/login" exact={true}>
                            <SignInPage/>
                        </Route>
                        <Route path="/register" exact={true}>
                            <RegistryPage/>
                        </Route>
                        <Route path="/forgot-password" exact={true}>
                            <ForgotPasswordPage/>
                        </Route>
                        <Route path="/reset-password" exact={true}>
                            <ResetPasswordPage/>
                        </Route>
                        <ProtectedRoute path="/profile" exact={true}>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <Route path={`/ingredients/:id`} exact={true}>
                            {modalOpen && currentIngredient ? <MainPage /> : <IngredientDetailsPage/>}
                        </Route>
                        <Route>
                            <NotFound404/>
                        </Route>
                    </Switch>
                </Router>
            </ProvideAuth>
        </>
    );
}