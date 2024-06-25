import express from 'express';
import {
  getStudentMaterialById,
  getStudentMaterials,
  getInstitutions,
  getInstitutionById,
  applyToInstitutionAdmission,
  getCenters,
  getCenterById,
  applyToCenterAdmission,
  getProfile,
  updateProfile,
  registerUser,
  loginUser,
  logoutUser,
  getPostedAdmissionById,
  getAllPostedAdmissions,
  applyToAnyAdmission,
  getmyAdmissionEnquiries
} from '../controllers/studentController.js';

import { isAuthenticated,isStudent } from '../middlewares/auth.js';

const router = express.Router();

router.get('/materials', isAuthenticated, isStudent ,getStudentMaterials);
router.get('/materials/:id', isAuthenticated, isStudent ,getStudentMaterialById);

router.get('/institutions', isAuthenticated, isStudent ,getInstitutions);
router.get('/institutions/:id', isAuthenticated,isStudent , getInstitutionById);
router.post('/institutions/:id/admissions/:id/apply',isAuthenticated, isStudent ,applyToInstitutionAdmission);

router.get('/centers', isAuthenticated, isStudent ,getCenters);
router.get('/centers/:id', isAuthenticated, isStudent ,getCenterById);
router.post('/centers/:id/admissions/:id/apply', isAuthenticated,isStudent ,applyToCenterAdmission);

router.get('/postedadmissions', isAuthenticated,isStudent , getAllPostedAdmissions);
router.get('/postedadmissions/:id', isAuthenticated,isStudent , getPostedAdmissionById);
router.post('/postedadmissions/:id/apply',isAuthenticated,isStudent ,applyToAnyAdmission);
router.get('/myenquiries',isAuthenticated, isStudent,getmyAdmissionEnquiries);

router.get('/profile', isAuthenticated,isStudent , getProfile);
router.put('/updateProfile', isAuthenticated, isStudent ,updateProfile);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',isAuthenticated, logoutUser);

export default router;
