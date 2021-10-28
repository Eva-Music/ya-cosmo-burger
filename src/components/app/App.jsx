import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from "../main/MainPage";
import {NotFound404} from "../../pages/NotFound404";
import SignInPage from "../../pages/SignInPage";
import RegistryPage from "../../pages/RegistryPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import {ProtectedRoute} from "../protected-route";
import {ProvideAuth, useAuth} from '../../services/auth';
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
    } = useSelector(state => state.order);

    useEffect(
        () => {
            if (!allIngredientsData.length) dispatch(getListIngredients());
        },
        []
    );

    return (
        <>

            <ProvideAuth>
                <Router>
                    <AppHeader/>
                    <Switch>
                        <ProtectedRoute path="/" exact={true}>
                            <MainPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/login" exact={true}>
                            <SignInPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/register" exact={true}>
                            <RegistryPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/forgot-password" exact={true}>
                            <ForgotPasswordPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/reset-password" exact={true}>
                            <ResetPasswordPage/>
                        </ProtectedRoute>
                        <ProtectedRoute path="/profile" exact={true}>
                            <ProfilePage/>
                        </ProtectedRoute>
                        <ProtectedRoute path={`/ingredients/:id`} exact={true}>
                            {modalOpen && currentIngredient ? <MainPage /> : <IngredientDetailsPage/>}
                        </ProtectedRoute>
                        <Route>
                            <NotFound404/>
                        </Route>
                    </Switch>
                </Router>
            </ProvideAuth>
        </>
    );
}