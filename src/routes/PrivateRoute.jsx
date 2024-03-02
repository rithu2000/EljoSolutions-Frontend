import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem("employeeToken");

    return token ? (
        <Outlet />
    ) : (
        <Navigate to={"/"} />
    );
}

export default PrivateRoute;