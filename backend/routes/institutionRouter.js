import express from 'express';
import { postMaterial } from '../controllers/materialController.js';
import {
  registerInstitution,
  loginInstitution,
  logoutInstitution,
  getMaterials,
  getMaterialById,
  postAdmission,
  getAdmissions,
  getAdmissionById,
  getAdmissionEnquiry,
  getAdmissionEnquiryById,
  getInstitutionProfile,
  updateInstitutionProfile,

} from '../controllers/institutionController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Registration and Authentication Routes
router.post('/register', registerInstitution);
router.post('/login', loginInstitution);
router.post('/logout', isAuthenticated, logoutInstitution);

// Profile Routes
router.get('/profile', isAuthenticated, getInstitutionProfile);
router.put('/updateProfile', isAuthenticated, updateInstitutionProfile);

// Learning Materials Routes

router.post('/material', isAuthenticated, postMaterial);
router.get('/materials', isAuthenticated, getMaterials);
router.get('/materials/:id', isAuthenticated, getMaterialById);

// Admissions Routes
router.post('/admissions', isAuthenticated, postAdmission);
router.get('/admissions', isAuthenticated, getAdmissions);
router.get('/admissions/:id', isAuthenticated, getAdmissionById);

// Admission Enquiries Routes
router.get('/admissionEnquiry', isAuthenticated, getAdmissionEnquiry);
router.get('/admissionEnquiry/:id', isAuthenticated, getAdmissionEnquiryById);



export default router;
