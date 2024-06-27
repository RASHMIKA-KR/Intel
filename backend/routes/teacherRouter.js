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
import { authenticateTeacher} from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', authenticateTeacher,logoutTeacher);

router.get('/materials', authenticateTeacher,  getAllPostedMaterials);
router.get('/materials/:id', authenticateTeacher,   getPostedMaterialById);
router.get('/myMaterials', authenticateTeacher,   getMaterialsPostedByMe);
router.post('/postMaterial', authenticateTeacher,   postNewMaterial);
router.delete('/delmaterial/:id', authenticateTeacher,   deletePostMaterial);

router.get('/vacancies', authenticateTeacher,  getAllvacancies);
router.post('/apply', authenticateTeacher,   applytoVacancy);
router.get('/vacancy/:id', authenticateTeacher,   getvacancybyid);
router.get('/myenquiries',authenticateTeacher,   getmyVacancyEnquiries);


export default router;