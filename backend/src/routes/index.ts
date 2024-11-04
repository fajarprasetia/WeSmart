import express from 'express';
import authRoutes from './authRoutes';
import customerRoutes from './customerRoutes';
import whatsappRoutes from './whatsappRoutes'; // Ensure this file exists

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/whatsapp', whatsappRoutes); // Ensure this route is correctly set up

export default router;
