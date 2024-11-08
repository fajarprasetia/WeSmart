// Chat.tsx

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import '../styles/chat.css';

interface Message {
    sender: string;
    content: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Initialize Socket.io client
        const newSocket = io('http://154.53.47.13:5000'); // Replace with your backend URL if different
        setSocket(newSocket);

        // Listen for incoming messages
        newSocket.on('receive_message', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        // Cleanup on component unmount
        return () => {
            newSocket.close();
        };
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }
        try {
            // Replace 'customer_phone_number' with dynamic value as needed
            const response = await axios.post('/api/whatsapp/send', {
                to: 'customer_phone_number', // Ideally, dynamically set based on selected customer
                message: newMessage
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages([...messages, { sender: 'You', content: newMessage }]);
            setNewMessage('');
        } catch (error: any) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h2>Live Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
