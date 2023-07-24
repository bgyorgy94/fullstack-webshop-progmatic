import express from 'express';
import ordersController from '../controllers/orders-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.use(userVerify);

router.get('/', ordersController.findAll);
router.get('/:orderId/', ordersController.getOrderDetails);
router.post('/', ordersController.create);
router.delete('/:orderId', ordersController.delete);

export default router;
