import express from 'express';
import {getAllTasks, createTask, getTasksByUserId, getTaskById, updateTask, updateStatus, deleteTask} from '../Controllers/taskController.js';

const taskRouter = express.Router();

taskRouter
    .route('/')
    .get(getAllTasks)
    .post(createTask);
taskRouter
    .route('/user-tasks/:id')
    .get(getTasksByUserId);
taskRouter
    .route('/update-task/:id')
    .patch(updateTask);
taskRouter
    .route('/update-status/:id')
    .patch(updateStatus);
taskRouter
    .route('/:id')
    .get(getTaskById)
    .delete(deleteTask);

export default taskRouter;