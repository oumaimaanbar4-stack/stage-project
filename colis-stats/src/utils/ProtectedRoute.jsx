import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check if the token exists in LocalStorage
    const token = localStorage.getItem('token');

    // If no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, render the child component (the Dashboard)
    return <Outlet />;
};

export default ProtectedRoute;