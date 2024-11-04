// UserProfile.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/userProfile.css';

interface UserProfileProps {
    // Define any props if necessary
}

interface UserData {
    id: number;
    username: string;
    email: string;
    // Add other relevant fields
}

const UserProfile: React.FC<UserProfileProps> = () => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const response = await axios.get('/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile">
            <h2>Welcome, {user.username}!</h2>
            <p>Email: {user.email}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserProfile;
