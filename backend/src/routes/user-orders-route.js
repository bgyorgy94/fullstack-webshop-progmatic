import express from 'express';
import userOrdersController from '../controllers/user-orders-controller';

const router = express.Router();

router.post('/', userOrdersController.findAll);
router.post('/:orderId', userOrdersController.find);
router.post('/create', userOrdersController.create);
router.delete('/:orderId', userOrdersController.delete);

export default router;
