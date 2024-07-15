import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile, getPdfs, downloadPdf  } from '../controllers/pdfController.js';
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original filename without any suffix
},
});


const upload = multer({ storage: storage });

router.post('/upload-files', upload.single('file'), uploadFile);
router.get('/get-files', getPdfs);
router.get('/download/:pdfId', downloadPdf);
export default router;
