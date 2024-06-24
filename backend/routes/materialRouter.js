import express from 'express';
import { postLearningMaterial } from '../controllers/materialController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Route to post new learning material
router.post('/material', isAuthenticated, postLearningMaterial);

export default router;
