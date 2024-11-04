// AddCustomer.tsx

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addCustomer.css';

interface AddCustomerResponse {
    message: string;
    // Add other relevant fields if necessary
}

const AddCustomer: React.FC = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('No authentication token found. Please log in.');
                return;
            }

            const response = await axios.post<AddCustomerResponse>('/api/customers/add', {
                name,
                phoneNumber,
                email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            setName('');
            setPhoneNumber('');
            setEmail('');
        } catch (error: any) {
            setMessage(error.response?.data?.error || 'Error adding customer.');
            console.error(error);
        }
    };

    return (
        <div className="add-customer-container">
            <h2>Add New Customer</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
