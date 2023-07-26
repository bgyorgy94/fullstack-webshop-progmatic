import express from 'express';
import cartController from '../controllers/cart-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.use(userVerify);

router.post('/', cartController.add);
router.get('/', cartController.getAll);
router.delete('/:id', cartController.delete);
router.delete('/', cartController.deleteAll);

export default router;
