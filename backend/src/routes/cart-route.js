import express from 'express';
import cartController from '../controllers/cart-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.post('/', userVerify, cartController.add);
router.get('/', userVerify, cartController.getAll);
router.delete('/:id', userVerify, cartController.delete);
router.delete('/remove/:id', userVerify, cartController.remove);
router.delete('/', userVerify, cartController.deleteAll);

export default router;
