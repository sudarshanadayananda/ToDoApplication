import express from 'express';
import { authRouter } from './auth.router';
import { taskRouter } from './task.router';

export const restRouter = express.Router();

restRouter.use('/auth/login', authRouter);
restRouter.use('/task', taskRouter);