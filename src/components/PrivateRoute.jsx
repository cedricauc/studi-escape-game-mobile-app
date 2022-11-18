import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from "../services/auth.service";

export { PrivateRoute };

const PrivateRoute = () => {
    const auth = AuthService.getCurrentUser()
    console.log(auth)
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

