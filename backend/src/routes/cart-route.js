import express from 'express';
import cartController from '../controllers/cart-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.post('/', userVerify, cartController.add);
router.get('/', userVerify, cartController.getAll);

export default router;