import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to WeSmart Dashboard</h2>
            <nav>
                <ul>
                    <li><Link to="/add-customer">Add Customer</Link></li>
                    <li><Link to="/chat">Live Chat</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default Dashboard;
