// routes/adminRoutes.js
import express from 'express';
import {
  addStudent,
  deleteStudent,
  addTeacher,
  deleteTeacher,
  addInstitution,
  deleteInstitution,
  addCenter,
  deleteCenter,
  listPendingInstitutions,
  viewInstitutionRegistration,
  approveInstitutionRegistration,
  denyInstitutionRegistration,
  listPendingCenters,
  viewCenterRegistration,
  approveCenterRegistration,
  denyCenterRegistration,
 adminLogin 

} from '../controllers/adminController.js';
import { authenticateAdmin} from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('addStudent', authenticateAdmin,     addStudent);
router.delete('/students/:id', authenticateAdmin,     deleteStudent);
router.post('/teachers', authenticateAdmin,     addTeacher);
router.delete('/teachers/:id', authenticateAdmin,     deleteTeacher);
router.post('/institutions', authenticateAdmin,     addInstitution);
router.delete('/institutions/:id', authenticateAdmin,     deleteInstitution);
router.post('/centers', authenticateAdmin,     addCenter);
router.delete('/centers/:id', authenticateAdmin,     deleteCenter);

router.get('/pending-institutions', authenticateAdmin,     listPendingInstitutions);
router.get('/pending-institutions/:id', authenticateAdmin,     viewInstitutionRegistration);
router.put('/approve-institution/:id', authenticateAdmin,     approveInstitutionRegistration);
router.put('/deny-institution/:id', authenticateAdmin,     denyInstitutionRegistration);

router.get('/pending-centers', authenticateAdmin,     listPendingCenters);
router.get('/pending-centers/:id', authenticateAdmin,     viewCenterRegistration);
router.put('/approve-center/:id', authenticateAdmin,     approveCenterRegistration);
router.put('/deny-center/:id', authenticateAdmin,     denyCenterRegistration);

export default router;
