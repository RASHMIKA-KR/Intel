import express from 'express';
import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getAllMaterials,
  getMaterialById,
  getMyMaterials,
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
router.get('/myMaterials', isAuthenticated, getMyMaterials);
router.post('/postMaterial', isAuthenticated, postMaterial);

router.post('/center', isAuthenticated, createCenter);
// Route to post new material 

export default router;