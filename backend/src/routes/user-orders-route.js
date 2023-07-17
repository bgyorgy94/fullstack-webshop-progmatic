import express from 'express';
import userOrdersController from '../controllers/user-orders-controller';

const router = express.Router();

router.get('/', userOrdersController.findAll);
router.get('/:orderId', userOrdersController.find);
router.post('/', userOrdersController.create);
router.delete('/:orderId', userOrdersController.delete);

export default router;
