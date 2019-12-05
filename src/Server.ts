import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import authRouter from './routes/auth-router';
import userRouter from './routes/user-router';
import request from 'request';

request.debug = true;
// Init express
const port = 3000;
const app = express();

// view engine setup

// app.use(logger('dev'));
const whitelist = ['http://localhost', 'http://localhost:4200'];
const corsOptions = {
    origin(origin: any, callback: any) {
        // if (whitelist.indexOf(origin) !== -1 || origin == null) {
        callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS'));
        // }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
};

app.use(cors(corsOptions));

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', authRouter);
app.use('/api/v1/user', userRouter);

// Export express instance
export default app;
