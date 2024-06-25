import express from 'express';
import {
  registerTeacher,
  loginTeacher,
  logoutTeacher,
  getAllPostedMaterials,
  getPostedMaterialById,
  getMaterialsPostedByMe,
  postNewMaterial,
deletePostMaterial,
getAllvacancies,
applytoVacancy,getvacancybyid,getmyVacancyEnquiries} from '../controllers/teacherController.js';
import { isAuthenticated,isTeacher } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', isAuthenticated,logoutTeacher);

router.get('/materials', isAuthenticated,isTeacher,getAllPostedMaterials);
router.get('/materials/:id', isAuthenticated, isTeacher,getPostedMaterialById);
router.get('/myMaterials', isAuthenticated, isTeacher,getMaterialsPostedByMe);
router.post('/postMaterial', isAuthenticated,isTeacher, postNewMaterial);
router.delete('/delmaterial/:id', isAuthenticated, isTeacher,deletePostMaterial);

router.get('/vacancies', isAuthenticated,isTeacher,getAllvacancies);
router.post('/apply', isAuthenticated,isTeacher, applytoVacancy);
router.get('/vacancy/:id', isAuthenticated, isTeacher,getvacancybyid);
router.get('/myenquiries',isAuthenticated, isTeacher,getmyVacancyEnquiries);


export default router;