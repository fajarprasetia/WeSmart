import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import '../styles/chat.css';

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string, content: string }[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io('http://154.53.47.13:5000');
        setSocket(newSocket);

        newSocket.on('receive_message', (msg: { sender: string, content: string }) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => newSocket.close();
    }, [setSocket]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const token = localStorage.getItem('token');
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
        } catch (error) {
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
