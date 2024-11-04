import express from 'express';
import { io } from '../app';
import { sendMessage } from '../services/whatsappService';
import { Conversation, Message } from '../models';
import passport from 'passport';
import { verifyWebhook } from '../middleware/verifyWebhook';

const router = express.Router();

// Webhook Verification Endpoint
router.get('/webhook', verifyWebhook, (req, res) => {
    // Handled by middleware
});

// Webhook Handler
router.post('/webhook', verifyWebhook, async (req, res) => {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(async (entry: any) => {
            entry.changes.forEach(async (change: any) => {
                if (change.field === 'messages') {
                    const message = change.value.messages[0];
                    const from = message.from;
                    const msgBody = message.text.body;

                    // Save to database
                    let conversation = await Conversation.findOne({ where: { customerNumber: from } });
                    if (!conversation) {
                        conversation = await Conversation.create({ customerNumber: from, agentId: 1 }); // Assign agent as needed
                    }

                    await Message.create({
                        conversationId: conversation.id,
                        sender: from,
                        content: msgBody,
                    });

                    // Emit to frontend via Socket.io
                    io.emit('receive_message', { sender: from, content: msgBody });
                }
            });
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Endpoint to Send Message to Customer
router.post('/send', async (req, res) => {
    const { to, message } = req.body;

    try {
        const whatsappResponse = await sendMessage(to, message);
        res.json(whatsappResponse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default router;
