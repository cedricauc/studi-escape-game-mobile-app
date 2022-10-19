import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from "../services/auth.service";

export { PrivateRoute };

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = AuthService.getCurrentUser()
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

