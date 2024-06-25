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
import {isAuthenticated ,isCenter} from "../middlewares/auth.js"; 

const router = express.Router();
router.post('/register', registerCenter);
router.post('/login', loginCenter);
router.post('/logout', isAuthenticated,logoutCenter);

router.get('/materials', isAuthenticated,isCenter,allPostedMaterials);
router.get('/materials/:id', isAuthenticated, isCenter,postedMaterialById);
router.get('/myMaterials', isAuthenticated, isCenter,materialsPostedByMe);
router.post('/postMaterial', isAuthenticated,isCenter, newMaterialPost);
router.delete('/delmaterial/:id', isAuthenticated,isCenter,deletetheMaterial);

router.post("/postAdmission",isAuthenticated,isCenter, postNewAdmission);
router.get("/admissions",isAuthenticated,isCenter,getPostedAdmissions);
router.get("/admission/:id",isAuthenticated,isCenter,getSingleAdmission);
router.put('/putAdmission/:id', isAuthenticated, isCenter,updatetheAdmission);
router.delete('/delAdmission/:id', isAuthenticated, isCenter,deletetheAdmission);

router.get("/admission-enquiries",isAuthenticated, isCenter,getEveryAdmissionEnquiry);
router.get("/admission-enquiry/:id",isAuthenticated,isCenter,  getSingleAdmissionEnquiry);
router.put('/admissionEnquiry/:id/status', isAuthenticated,isCenter, updateStatusOfEnquiry);

router.get('allvacancy',isAuthenticated,isCenter,getvacanciesbyMe);
router.post('/vacancy', isAuthenticated,isCenter, CreateVacancy);
router.put('/vacancy/:id', isAuthenticated, isCenter, UpdateVacancy);
router.delete('/vacancy/:id', isAuthenticated,isCenter, DelVacancy);
router.get('/vacancy/:id', isAuthenticated, isCenter,getvacancybyId);

router.get("/vacancy-enquiries",isAuthenticated, isCenter,getAllvEnquiries);
router.get("/vacancy-enquiry/:id",isAuthenticated,isCenter,  getvEnquiryById);
router.put('/vacancyEnquiry/:id/status', isAuthenticated,isCenter, updatevEnquiryStatus);


router.route("/profile").get(isAuthenticated, isCenter,getCenterProfile);
router.route("/profile/update").put(isAuthenticated, isCenter,updateCenterProfile);

export default router;