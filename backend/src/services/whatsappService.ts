import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

export const sendMessage = async (to: string, message: string) => {
    try {
        const response = await axios.post(
            `${WHATSAPP_API_URL}/messages`,
            {
                messaging_product: "whatsapp",
                to,
                text: { body: message },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
};
