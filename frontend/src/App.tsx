// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import Chat from './components/Chat';
import UserProfile from './components/UserProfile';
import Setup from './pages/Setup';

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/setup" element={<Setup />} />
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                    path="/add-customer"
                    element={isAuthenticated ? <AddCustomer /> : <Navigate to="/login" />}
                />
                <Route
                    path="/chat"
                    element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
                />
                <Route
                    path="/profile"
                    element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
};

export default App;
