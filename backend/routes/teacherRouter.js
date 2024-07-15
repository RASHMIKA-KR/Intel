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
import multer from 'multer';
import path from 'path';
const router = express.Router();

router.post('/register', registerTeacher);
router.post('/login', loginTeacher);
router.post('/logout', authenticateTeacher,logoutTeacher);

router.get('/materials', authenticateTeacher,  getAllPostedMaterials);
router.get('/materials/:id', authenticateTeacher,   getPostedMaterialById);
router.get('/myMaterials', authenticateTeacher,   getMaterialsPostedByMe);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename without any suffix
},
});

const upload = multer({ storage: storage });
export const uploadFile = upload.single('file'); 
router.post('/postMaterial', uploadFile,postNewMaterial);
// Route for single file upload

// route for multiple file uploads
router.post('/postmaterial/multiple', upload.array('files', 10), authenticateTeacher,   postNewMaterial);
router.delete('/delmaterial/:id', authenticateTeacher,   deletePostMaterial);

router.get('/vacancies', authenticateTeacher,  getAllvacancies);
router.post('/apply', authenticateTeacher,   applytoVacancy);
router.get('/vacancy/:id', authenticateTeacher,   getvacancybyid);
router.get('/myenquiries',authenticateTeacher,   getmyVacancyEnquiries);


export default router;