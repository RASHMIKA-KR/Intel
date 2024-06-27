import express from "express";
import {
  registerCenter,
  loginCenter,
  logoutCenter,
  allPostedMaterials,
  postedMaterialById,
  materialsPostedByMe,
  newMaterialPost,
  deletetheMaterial,
  postNewAdmission,
  getPostedAdmissions,
  getSingleAdmission,
  updatetheAdmission,
  deletetheAdmission,
  getEveryAdmissionEnquiry,
  getSingleAdmissionEnquiry,
  CreateVacancy,
  UpdateVacancy,
  DelVacancy,
  getCenterProfile,
  updateCenterProfile,
  updateStatusOfEnquiry,
  getvEnquiryById,
  getAllvEnquiries,
  getvacanciesbyMe,
  getvacancybyId,
  updatevEnquiryStatus,
} from "../controllers/centerController.js";
import {authenticateCenter } from "../middlewares/auth.js"; 

const router = express.Router();
router.post('/register', registerCenter);
router.post('/login', loginCenter);
router.post('/logout', authenticateCenter,logoutCenter);

router.get('/materials', authenticateCenter,  allPostedMaterials);
router.get('/materials/:id', authenticateCenter,   postedMaterialById);
router.get('/myMaterials', authenticateCenter,   materialsPostedByMe);
router.post('/postMaterial', authenticateCenter,   newMaterialPost);
router.delete('/delmaterial/:id', authenticateCenter,  deletetheMaterial);

router.post("/postAdmission",authenticateCenter,   postNewAdmission);
router.get("/admissions",authenticateCenter,  getPostedAdmissions);
router.get("/admission/:id",authenticateCenter,  getSingleAdmission);
router.put('/putAdmission/:id', authenticateCenter,   updatetheAdmission);
router.delete('/delAdmission/:id', authenticateCenter,   deletetheAdmission);

router.get("/admission-enquiries",authenticateCenter,   getEveryAdmissionEnquiry);
router.get("/admission-enquiry/:id",authenticateCenter,    getSingleAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', authenticateCenter,   updateStatusOfEnquiry);

router.get('allvacancy',authenticateCenter,  getvacanciesbyMe);
router.post('/vacancy', authenticateCenter,   CreateVacancy);
router.put('/vacancy/:id', authenticateCenter,    UpdateVacancy);
router.delete('/vacancy/:id', authenticateCenter,   DelVacancy);
router.get('/vacancy/:id', authenticateCenter,   getvacancybyId);

router.get("/vacancy-enquiries",authenticateCenter,   getAllvEnquiries);
router.get("/vacancy-enquiry/:id",authenticateCenter,    getvEnquiryById);
router.put('/vacancyEnquiry/:id/status', authenticateCenter,   updatevEnquiryStatus);


router.route("/profile").get(authenticateCenter,   getCenterProfile);
router.route("/profile/update").put(authenticateCenter,   updateCenterProfile);

export default router;