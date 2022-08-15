import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "../constants/addresses/routes/auth.route";
import MainRoute from "../constants/addresses/routes/main.route";

import SignInPage from "../containers/AuthPage/SignInPage";
import SignUpPage from "../containers/AuthPage/SignUpPage";
import HomePage from "../containers/HomePage";

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path={MainRoute.home_page} exact element={<HomePage />} />

                <Route
                    path="*"
                    exact
                    element={<Navigate to={MainRoute.home_page} />}
                />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path={AuthRoute.sign_in_page} exact element={<SignInPage />} />
            <Route path={AuthRoute.sign_up_page} exact element={<SignUpPage />} />
            <Route
                path="*"
                exact
                element={<Navigate to={AuthRoute.sign_in_page} />}
            />
        </Routes>
    );
};

export default useRoutes;