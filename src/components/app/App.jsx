import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from "../main/MainPage";
import {NotFound404} from "../../pages/NotFound404";
import SignInPage from "../../pages/SignInPage";
import RegistryPage from "../../pages/RegistryPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import {ProtectedRoute} from "../protected-route";
import { ProvideAuth } from '../../services/auth';
import IngredientDetailsPage from "../../pages/IngredientDetailsPage";

export default function App() {

    return (
        <ProvideAuth>

        <Router>
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
                    <ForgotPasswordPage />
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password" exact={true}>
                    <ResetPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path={`/ingredients/:id`} exact={true}>
                    <IngredientDetailsPage />
                </ProtectedRoute>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
        </Router>
        </ProvideAuth>
    );
}