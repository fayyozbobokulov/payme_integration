import { Router } from 'express';
const router = Router();

import { fileUpload } from '../controllers/fileupload.js';
import { upload } from '../middlewares/file.js';

router.post('/', upload.single('file'), fileUpload);

export default router;
