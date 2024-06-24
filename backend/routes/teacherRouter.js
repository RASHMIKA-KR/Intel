import express from 'express';
import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getMaterials,
  getMaterialById,
  postMaterial,
  createCenter,
} from '../controllers/teacherController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', logoutTeacher);

router.get('/materials', isAuthenticated, getMaterials);
router.get('/material/:id', isAuthenticated, getMaterialById);
router.post('/material', isAuthenticated, postMaterial);

router.post('/center', isAuthenticated, createCenter);

export default router;