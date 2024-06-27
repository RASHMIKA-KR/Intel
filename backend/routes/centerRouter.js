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
import {isAuthenticated } from "../middlewares/auth.js"; 

const router = express.Router();
router.post('/register', registerCenter);
router.post('/login', loginCenter);
router.post('/logout', isAuthenticated,logoutCenter);

router.get('/materials', isAuthenticated,  allPostedMaterials);
router.get('/materials/:id', isAuthenticated,   postedMaterialById);
router.get('/myMaterials', isAuthenticated,   materialsPostedByMe);
router.post('/postMaterial', isAuthenticated,   newMaterialPost);
router.delete('/delmaterial/:id', isAuthenticated,  deletetheMaterial);

router.post("/postAdmission",isAuthenticated,   postNewAdmission);
router.get("/admissions",isAuthenticated,  getPostedAdmissions);
router.get("/admission/:id",isAuthenticated,  getSingleAdmission);
router.put('/putAdmission/:id', isAuthenticated,   updatetheAdmission);
router.delete('/delAdmission/:id', isAuthenticated,   deletetheAdmission);

router.get("/admission-enquiries",isAuthenticated,   getEveryAdmissionEnquiry);
router.get("/admission-enquiry/:id",isAuthenticated,    getSingleAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', isAuthenticated,   updateStatusOfEnquiry);

router.get('allvacancy',isAuthenticated,  getvacanciesbyMe);
router.post('/vacancy', isAuthenticated,   CreateVacancy);
router.put('/vacancy/:id', isAuthenticated,    UpdateVacancy);
router.delete('/vacancy/:id', isAuthenticated,   DelVacancy);
router.get('/vacancy/:id', isAuthenticated,   getvacancybyId);

router.get("/vacancy-enquiries",isAuthenticated,   getAllvEnquiries);
router.get("/vacancy-enquiry/:id",isAuthenticated,    getvEnquiryById);
router.put('/vacancyEnquiry/:id/status', isAuthenticated,   updatevEnquiryStatus);


router.route("/profile").get(isAuthenticated,   getCenterProfile);
router.route("/profile/update").put(isAuthenticated,   updateCenterProfile);

export default router;