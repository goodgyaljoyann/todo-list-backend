import express from 'express';
import { getAllUsers, createUser, getUserById, deleteUser, updateUser } from '../Controllers/userController.js';

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
    

userRouter
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser);

userRouter
    .route('/update-user/:id')
    .patch(updateUser);
    
export default userRouter;
