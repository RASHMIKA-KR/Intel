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

import { authenticateStudent  } from '../middlewares/auth.js';

const router = express.Router();

router.get('/materials', authenticateStudent,   getStudentMaterials);
router.get('/materials/:id', authenticateStudent,   getStudentMaterialById);

router.get('/institutions',authenticateStudent,getInstitutions);
router.get('/institutions/:id', getInstitutionById);
router.post('/institutions/:id/admissions/:id/apply',authenticateStudent,  applyToInstitutionAdmission);

router.get('/centers', authenticateStudent,   getCenters);
router.get('/centers/:id', authenticateStudent,   getCenterById);
router.post('/centers/:id/admissions/:id/apply', authenticateStudent,  applyToCenterAdmission);

router.get('/postedadmissions', authenticateStudent,   getAllPostedAdmissions);
router.get('/postedadmissions/:id', authenticateStudent,  getPostedAdmissionById);
router.post('/postedadmissions/:id/apply',authenticateStudent,  applyToAnyAdmission);
router.get('/myenquiries',authenticateStudent,  getmyAdmissionEnquiries);

router.get('/profile', authenticateStudent,   getProfile);
router.put('/updateProfile', authenticateStudent,  updateProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',authenticateStudent, logoutUser);

export default router;
