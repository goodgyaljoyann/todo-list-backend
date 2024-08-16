import express from 'express';
import multer from 'multer';
import {getAllTasks, createTask, getTasksByUserId, getTaskById, updateTask, updateStatus, deleteTask} from '../Controllers/taskController.js';

const taskRouter = express.Router();

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads/images'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set unique filename for each uploaded image
    }
});
  
  // Create multer instance with the defined storage configuration
  const upload = multer({ storage: storage });

taskRouter
    .route('/')
    .get(getAllTasks)
    .post(upload.single('picture'),createTask);
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