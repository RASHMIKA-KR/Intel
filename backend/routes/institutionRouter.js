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
import { isAuthenticated,isInstitution, isTeacher } from '../middlewares/auth.js';

const router = express.Router();

// Registration and Authentication Routes
router.post('/register', registerInstitution);
router.post('/login', loginInstitution);
router.post('/logout', isAuthenticated, logoutInstitution);

// Profile Routes
router.get('/profile', isAuthenticated,isInstitution, getInstitutionProfile);
router.put('/updateProfile', isAuthenticated, isInstitution,updateInstitutionProfile);

// Learning Materials Routes

router.get('materials', isAuthenticated, isInstitution,AllPostedMaterials);
router.get('materials/:id', isAuthenticated, isInstitution,PostedMaterialById);
router.get('myMaterials', isAuthenticated, isInstitution,MaterialsPostedByMe);
router.post('/postMaterial', isAuthenticated, isInstitution,NewMaterialPost);
router.delete('/delmaterial/:id', isAuthenticated, isInstitution,deletePostedMaterial);

// Admissions Routes
router.post('/postAdmission', isAuthenticated, isInstitution,postAdmission);
router.get('/admission', isAuthenticated, isInstitution,getAdmissionsByMe);
router.get('/admission/:id', isAuthenticated, isInstitution,getOneAdmission);
router.put('/putAdmission/:id', isAuthenticated, isInstitution,updatePostedAdmission);
router.delete('/delAdmission/:id', isAuthenticated, isInstitution,deletePostedAdmission);

// Admission Enquiries Routes
router.get('/admissionEnquiry', isAuthenticated,isInstitution, getAllAdmissionEnquiry);
router.get('/admissionEnquiry/:id', isAuthenticated, isInstitution,getOneAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', isAuthenticated,isInstitution, updateEnquiryStatus);

router.get('allvacancy',isAuthenticated,isInstitution,getvacanciesByMe);
router.get('/vacancy/:id', isAuthenticated, isInstitution,getvacancybyId);
router.post('/vacancy', isAuthenticated,isInstitution, createVacancy);
router.put('/vacancy/:id', isAuthenticated, isInstitution, Updatevacancy);
router.delete('/vacancy/:id', isAuthenticated,isInstitution, delVacancy);

router.get("/vacancy-enquiries",isAuthenticated, isTeacher,getAllVEnquiries);
router.get("/vacancy-enquiry/:id",isAuthenticated,isTeacher,  getVEnquiryById);
router.put('/vacancyEnquiry/:id/status', isAuthenticated,isTeacher, updateVEnquiryStatus);

export default router;
