import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRouter from './Routers/taskRouter.js'
import userRouter from './Routers/userRouter.js'
import authRouter from './Routers/authRouter.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Serve static files from the 'uploads' directory
app.use('/Uploads/images', express.static(join(__dirname, 'uploads', 'images')));

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
  
  // Setup JSON Body Parsing & URLEncoding
  app.use(express.json({ limit: '1kb' }));
  app.use(express.urlencoded({ extended: true, limit: '1kb' }));
  
  if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

  // Routes
app.use('/api/task', taskRouter);
app.use('/api/user', userRouter);
app.use('/api/authentication', authRouter);

const port = process.env.PORT || 5300; // Added default port if process.env.PORT is not defined
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


export default server; // Exporting server for potential future use
