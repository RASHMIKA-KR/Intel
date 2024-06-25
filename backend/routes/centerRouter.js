import express from "express";
import {
  registerCenter,
  loginCenter,
  logoutCenter,
  postMaterial,
  getMaterials,
  getMaterialById,
  postAdmission,
  getAdmissions,
  getAdmissionById,
  getAdmissionEnquiry,
  getAdmissionEnquiryById,
  getCenterProfile,
  updateCenterProfile,
} from "../controllers/centerController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.js"; // Assuming you have auth middlewares

const router = express.Router();

router.route("/center/register").post(registerCenter);
router.route("/center/login").post(loginCenter);
router.route("/center/logout").get(logoutCenter);

router.route("/center/material").post(isAuthenticated, authorizeRoles("Center"), postMaterial);
router.route("/center/materials").get(getMaterials);
router.route("/center/material/:id").get(getMaterialById);

router.route("/center/admission").post(isAuthenticated, authorizeRoles("Center"), postAdmission);
router.route("/center/admissions").get(getAdmissions);
router.route("/center/admission/:id").get(getAdmissionById);

router.route("/center/admission-enquiries").get(isAuthenticated, authorizeRoles("Center"), getAdmissionEnquiry);
router.route("/center/admission-enquiry/:id").get(isAuthenticated, authorizeRoles("Center"), getAdmissionEnquiryById);

router.route("/center/profile").get(isAuthenticated, authorizeRoles("Center"), getCenterProfile);
router.route("/center/profile/update").put(isAuthenticated, authorizeRoles("Center"), updateCenterProfile);

export default router;
 