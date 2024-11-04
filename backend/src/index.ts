// backend/src/app.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Ensure helmet is installed
import passport from './middleware/passport'; // Adjust the path as needed

// Import Routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/customerRoutes'; // Assuming you have user-related routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
