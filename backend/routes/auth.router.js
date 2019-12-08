import express from 'express';
import authController from '../controllers/auth.controller';

export const authRouter = express.Router();

authRouter.route('/')
    .post(authController.login);