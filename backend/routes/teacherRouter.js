import express from 'express';
import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getAllMaterials,
  getMaterialById,
  postMaterial,
  createCenter,
} from '../controllers/teacherController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', logoutTeacher);

router.get('/materials', isAuthenticated, getAllMaterials);
router.get('/materials/:id', isAuthenticated, getMaterialById);
router.post('/material', isAuthenticated, postMaterial);

router.post('/center', isAuthenticated, createCenter);
// Route to post new material 
router.post('/material', isAuthenticatedUser, postMaterial);

export default router;