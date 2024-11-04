// frontend/src/components/UserProfile.tsx

import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface User {
    id: number;
    username: string;
    email: string;
    // Add other user fields as necessary
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/profile');
                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                setError('Unable to load user profile.');
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Render other user information as needed */}
        </div>
    );
};

export default UserProfile;
