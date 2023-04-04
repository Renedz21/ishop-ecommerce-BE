import express from 'express';
import { addToCart } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/',);

// router.get('/:id',);

router.post('/cart/:productId', verifyToken, addToCart);
export default router;