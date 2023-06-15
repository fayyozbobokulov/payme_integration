import Router from 'express';
const router = Router();
import {
	getDrinks,
	getByIdDrink,
	postDrink,
	updateDrink,
	deletedDrink,
} from '../controllers/drinks.js';
import { verify } from '../middlewares/verfiy.js';
import { upload } from '../middlewares/file.js';
import { fileUpload } from '../controllers/fileupload.js';
router.post('/', upload.single('file'), fileUpload, postDrink);
router.put('/update/:id', updateDrink);
router.get('/', getDrinks);
router.get('/:id', getByIdDrink);
router.delete('/delete/:id', deletedDrink);

export default router;
