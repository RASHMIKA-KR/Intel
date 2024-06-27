import express from 'express';
import {
  registerInstitution,
  loginInstitution,
  logoutInstitution,
  AllPostedMaterials,
  PostedMaterialById,
  MaterialsPostedByMe,
  NewMaterialPost,
  deletePostedMaterial,
  postAdmission,
  getOneAdmission,
  deletePostedAdmission,
  updatePostedAdmission,
  getAllAdmissionEnquiry,
  getOneAdmissionEnquiry,
  getInstitutionProfile,
  updateInstitutionProfile,
  getAdmissionsByMe,
  updateEnquiryStatus,
  delVacancy,
  Updatevacancy,
  createVacancy,
  getvacanciesByMe,
  getvacancybyId,
  updateVEnquiryStatus,
  getVEnquiryById,
  getAllVEnquiries

} from '../controllers/institutionController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Registration and Authentication Routes
router.post('/register', registerInstitution);
router.post('/login', loginInstitution);
router.post('/logout', isAuthenticated, logoutInstitution);

// Profile Routes
router.get('/profile', isAuthenticated,   getInstitutionProfile);
router.put('/updateProfile', isAuthenticated,   updateInstitutionProfile);

// Learning Materials Routes

router.get('materials', isAuthenticated,   AllPostedMaterials);
router.get('materials/:id', isAuthenticated,   PostedMaterialById);
router.get('myMaterials', isAuthenticated,   MaterialsPostedByMe);
router.post('/postMaterial', isAuthenticated,   NewMaterialPost);
router.delete('/delmaterial/:id', isAuthenticated,   deletePostedMaterial);

// Admissions Routes
router.post('/postAdmission', isAuthenticated,   postAdmission);
router.get('/admission', isAuthenticated,   getAdmissionsByMe);
router.get('/admission/:id', isAuthenticated,   getOneAdmission);
router.put('/putAdmission/:id', isAuthenticated,   updatePostedAdmission);
router.delete('/delAdmission/:id', isAuthenticated,   deletePostedAdmission);

// Admission Enquiries Routes
router.get('/admissionEnquiry', isAuthenticated,   getAllAdmissionEnquiry);
router.get('/admissionEnquiry/:id', isAuthenticated,   getOneAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', isAuthenticated,   updateEnquiryStatus);

router.get('allvacancy',isAuthenticated,  getvacanciesByMe);
router.get('/vacancy/:id', isAuthenticated,   getvacancybyId);
router.post('/vacancy', isAuthenticated,   createVacancy);
router.put('/vacancy/:id', isAuthenticated,    Updatevacancy);
router.delete('/vacancy/:id', isAuthenticated,   delVacancy);

router.get("/vacancy-enquiries",isAuthenticated, getAllVEnquiries);
router.get("/vacancy-enquiry/:id",isAuthenticated,getVEnquiryById);
router.put('/vacancyEnquiry/:id/status', isAuthenticated, updateVEnquiryStatus);

export default router;
