import { Request, Response } from 'express';
import Customer from '../models/Customer'; // Changed from named to default import
import logger from '../utils/logger';

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
    const { name, phoneNumber, email } = req.body;

    if (!name || !phoneNumber) {
        res.status(400).json({ error: 'Name and phone number are required' });
        logger.warn('Failed to add customer - Name and phone number are required');
        return;
    }

    try {
        const existingCustomer = await Customer.findOne({ where: { phoneNumber } });
        if (existingCustomer) {
            res.status(409).json({ error: 'Customer with this phone number already exists' });
            logger.info(`Attempted to add existing customer with phone number: ${phoneNumber}`);
            return;
        }

        const customer = await Customer.create({ name, phoneNumber, email });
        logger.info(`Customer added successfully: ${customer.name} with phone number ${phoneNumber}`);
        res.status(201).json(customer);
    } catch (error) {
        logger.error(`Error adding customer: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};
