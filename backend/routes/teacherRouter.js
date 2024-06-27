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
import { isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', isAuthenticated,logoutTeacher);

router.get('/materials', isAuthenticated,  getAllPostedMaterials);
router.get('/materials/:id', isAuthenticated,   getPostedMaterialById);
router.get('/myMaterials', isAuthenticated,   getMaterialsPostedByMe);
router.post('/postMaterial', isAuthenticated,   postNewMaterial);
router.delete('/delmaterial/:id', isAuthenticated,   deletePostMaterial);

router.get('/vacancies', isAuthenticated,  getAllvacancies);
router.post('/apply', isAuthenticated,   applytoVacancy);
router.get('/vacancy/:id', isAuthenticated,   getvacancybyid);
router.get('/myenquiries',isAuthenticated,   getmyVacancyEnquiries);


export default router;