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

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/institution', institutionRouter);
app.use('/api/center', centerRouter);
app.use('/api/admin', adminRouter);
app.use(errorMiddleware);

export default app;
