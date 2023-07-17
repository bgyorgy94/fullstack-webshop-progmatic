import express from 'express';
import ordersController from '../controllers/orders-controller';

const router = express.Router();

router.get('/:userId/orders', ordersController.findAll);
router.get('/:userId/orders/:orderId', ordersController.find);
router.post('/:userId/orders', ordersController.create);
router.delete('/:userId/orders/:orderId', ordersController.delete);

export default router;
