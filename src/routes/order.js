import Router from 'express';
const router = Router();
import { verify } from '../middlewares/verfiy.js';
import { getOrder, addOrder } from '../controllers/order.js';

router.post('/', verify, addOrder);
router.put('/update/:id');
router.get('/', verify, getOrder);
router.get('/:id');
router.delete('/delete/:id');

export default router;
