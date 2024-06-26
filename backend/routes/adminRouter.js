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
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', adminLogin);
router.post('addStudent', isAuthenticated, isAdmin, addStudent);
router.delete('/students/:id', isAuthenticated, isAdmin, deleteStudent);
router.post('/teachers', isAuthenticated, isAdmin, addTeacher);
router.delete('/teachers/:id', isAuthenticated, isAdmin, deleteTeacher);
router.post('/institutions', isAuthenticated, isAdmin, addInstitution);
router.delete('/institutions/:id', isAuthenticated, isAdmin, deleteInstitution);
router.post('/centers', isAuthenticated, isAdmin, addCenter);
router.delete('/centers/:id', isAuthenticated, isAdmin, deleteCenter);

router.get('/pending-institutions', isAuthenticated, isAdmin, listPendingInstitutions);
router.get('/pending-institutions/:id', isAuthenticated, isAdmin, viewInstitutionRegistration);
router.put('/approve-institution/:id', isAuthenticated, isAdmin, approveInstitutionRegistration);
router.put('/deny-institution/:id', isAuthenticated, isAdmin, denyInstitutionRegistration);

router.get('/pending-centers', isAuthenticated, isAdmin, listPendingCenters);
router.get('/pending-centers/:id', isAuthenticated, isAdmin, viewCenterRegistration);
router.put('/approve-center/:id', isAuthenticated, isAdmin, approveCenterRegistration);
router.put('/deny-center/:id', isAuthenticated, isAdmin, denyCenterRegistration);

export default router;
