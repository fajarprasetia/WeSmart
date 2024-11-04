import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import passport from './middleware/passport';
import customerRoutes from './routes/customerRoutes';
import authRoutes from './routes/authRoutes';

app.use(passport.initialize());
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use('/api', routes);

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export { app, server, io };
