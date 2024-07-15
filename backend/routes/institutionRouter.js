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
import { authenticateInstitution } from '../middlewares/auth.js';

const router = express.Router();

// Registration and Authentication Routes
router.post('/register', registerInstitution);
router.post('/login', loginInstitution);
router.post('/logout', authenticateInstitution, logoutInstitution);

// Profile Routes
router.get('/profile', authenticateInstitution,   getInstitutionProfile);
router.put('/updateProfile', authenticateInstitution,   updateInstitutionProfile);

// Learning Materials Routes

router.get('materials', authenticateInstitution,   AllPostedMaterials);
router.get('materials/:id', authenticateInstitution,   PostedMaterialById);
router.get('myMaterials', authenticateInstitution,   MaterialsPostedByMe);
router.post('/postMaterial', authenticateInstitution,   NewMaterialPost);
router.delete('/delmaterial/:id', authenticateInstitution,   deletePostedMaterial);

// Admissions Routes
router.post('/postAdmission',  postAdmission);
router.get('/admission', authenticateInstitution,   getAdmissionsByMe);
router.get('/admission/:id', authenticateInstitution,   getOneAdmission);
router.put('/putAdmission/:id', authenticateInstitution,   updatePostedAdmission);
router.delete('/delAdmission/:id', authenticateInstitution,   deletePostedAdmission);

// Admission Enquiries Routes
router.get('/admissionEnquiry', authenticateInstitution,   getAllAdmissionEnquiry);
router.get('/admissionEnquiry/:id', authenticateInstitution,   getOneAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', authenticateInstitution,   updateEnquiryStatus);

router.get('allvacancy',authenticateInstitution,  getvacanciesByMe);
router.get('/vacancy/:id', authenticateInstitution,   getvacancybyId);
router.post('/vacancy', authenticateInstitution,   createVacancy);
router.put('/vacancy/:id', authenticateInstitution,    Updatevacancy);
router.delete('/vacancy/:id', authenticateInstitution,   delVacancy);

router.get("/vacancy-enquiries",authenticateInstitution, getAllVEnquiries);
router.get("/vacancy-enquiry/:id",authenticateInstitution,getVEnquiryById);
router.put('/vacancyEnquiry/:id/status', authenticateInstitution, updateVEnquiryStatus);

export default router;
