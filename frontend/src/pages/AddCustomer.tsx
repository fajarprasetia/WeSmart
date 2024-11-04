import React, { useState } from 'react';
import axios from 'axios';
import '../styles/addCustomer.css';

const AddCustomer: React.FC = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/customers/add', {
                name,
                phoneNumber,
                email
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Customer added successfully!');
            setName('');
            setPhoneNumber('');
            setEmail('');
        } catch (error) {
            setMessage('Error adding customer.');
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
