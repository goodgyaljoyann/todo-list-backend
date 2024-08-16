import express from 'express';
import { loginUser, registerUser, updateUserInfo } from '../Controllers/authController.js';

const authRouter = express.Router();

authRouter
    .route('/login')
    .post(loginUser);

authRouter
    .route('/register')
    .post(registerUser);

authRouter
    .route('/update-user/:id')
    .patch(updateUserInfo);

    export default authRouter;