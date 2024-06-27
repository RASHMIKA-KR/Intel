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


import { isAuthenticated  } from '../middlewares/auth.js';

const router = express.Router();

router.get('/materials', isAuthenticated,   getStudentMaterials);
router.get('/materials/:id', isAuthenticated,   getStudentMaterialById);

router.get('/institutions',getInstitutions);
router.get('/institutions/:id',  getInstitutionById);
router.post('/institutions/:id/admissions/:id/apply',isAuthenticated,  applyToInstitutionAdmission);

router.get('/centers', getCenters);
router.get('/centers/:id', isAuthenticated,   getCenterById);
router.post('/centers/:id/admissions/:id/apply', isAuthenticated,  applyToCenterAdmission);

router.get('/postedadmissions', isAuthenticated,   getAllPostedAdmissions);
router.get('/postedadmissions/:id', isAuthenticated,  getPostedAdmissionById);
router.post('/postedadmissions/:id/apply',isAuthenticated,  applyToAnyAdmission);
router.get('/myenquiries',isAuthenticated,  getmyAdmissionEnquiries);

router.get('/profile', isAuthenticated,   getProfile);
router.put('/updateProfile', isAuthenticated,  updateProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',isAuthenticated, logoutUser);

export default router;
