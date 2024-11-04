// Setup.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/setup.css';

const Setup: React.FC = () => {
    const [companyName, setCompanyName] = useState('');
    const [whatsappApiUrl, setWhatsappApiUrl] = useState('');
    const [whatsappAccessToken, setWhatsappAccessToken] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/setup', {
                companyName,
                whatsappApiUrl,
                whatsappAccessToken
            });
            setMessage(response.data.message);
            // Optionally, redirect to login or dashboard
            navigate('/login');
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Error during setup.');
            console.error(error);
        }
    };

    return (
        <div className="setup-container">
            <h2>Initial Setup for WeSmart CRM</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="WhatsApp API URL"
                    value={whatsappApiUrl}
                    onChange={(e) => setWhatsappApiUrl(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="WhatsApp Access Token"
                    value={whatsappAccessToken}
                    onChange={(e) => setWhatsappAccessToken(e.target.value)}
                    required
                />
                <button type="submit">Complete Setup</button>
            </form>
        </div>
    );
};

export default Setup;
