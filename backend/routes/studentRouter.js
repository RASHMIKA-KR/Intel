import express from 'express';
import {
  getAllMaterials,
  getMaterialById,
  getInstitutions,
  getInstitutionById,
  getCenters,
  getCenterById,
  getProfile,
  updateProfile,
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/studentController.js';

import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/materials', isAuthenticated, getAllMaterials);
router.get('/materials/:id', isAuthenticated, getMaterialById);

router.get('/institutions', isAuthenticated, getInstitutions);
router.get('/institutions/:id', isAuthenticated, getInstitutionById);

router.get('/centers', isAuthenticated, getCenters);
router.get('/centers/:id', isAuthenticated, getCenterById);

router.get('/profile', isAuthenticated, getProfile);

router.put('/updateProfile', isAuthenticated, updateProfile);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
