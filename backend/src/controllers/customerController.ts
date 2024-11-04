import { Request, Response } from 'express';
import Customer from '../models/Customer';

export const addCustomer = async (req: Request, res: Response) => {
    const { name, phoneNumber, email } = req.body;

    if (!name || !phoneNumber) {
        return res.status(400).json({ error: 'Name and phone number are required' });
    }

    try {
        const existingCustomer = await Customer.findOne({ where: { phoneNumber } });
        if (existingCustomer) {
            return res.status(409).json({ error: 'Customer with this phone number already exists' });
        }

        const customer = await Customer.create({ name, phoneNumber, email });
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
