import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import studentRouter from './routes/studentRouter.js';
import teacherRouter from './routes/teacherRouter.js';
import institutionRouter from './routes/institutionRouter.js';
import centerRouter from './routes/centerRouter.js';
import adminRouter from './routes/adminRouter.js';

const app = express();
dotenv.config({ path: './config/config.env' });

// CORS configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL], // Allow requests from the frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow these HTTP methods
  credentials: true, // Allow sending cookies from the frontend
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow these headers
}));

app.use(cookieParser()); // Parse cookies before handling requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
dbConnection(); // Establish connection to MongoDB
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' })); // Handle file uploads
app.use('/api/student', studentRouter); // Mount studentRouter at /api/student
app.use('/api/teacher', teacherRouter); // Mount teacherRouter at /api/teacher
app.use('/api/institution', institutionRouter); // Mount institutionRouter at /api/institution
app.use('/api/center', centerRouter); // Mount centerRouter at /api/center
app.use('/api/admin', adminRouter); // Mount adminRouter at /api/admin
app.use(errorMiddleware); // Error handling middleware

export default app;
