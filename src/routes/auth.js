import Router from 'express';
const router = Router();
import { Register, Login } from '../controllers/auth.js';

router.post('/login', Login);
router.post('/regester', Register);
router.put('/update/:id');
router.get('/:id');
router.delete('/delete/:id');

export default router;
