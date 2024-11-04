import express from 'express';
import { addCustomer } from '../controllers/customerController';
import passport from 'passport';

const router = express.Router();

// Protected Route: Only authenticated users can add customers
router.post('/add', passport.authenticate('jwt', { session: false }), addCustomer);

export default router;
