import express from 'express';
import ordersController from '../controllers/orders-controller';

const router = express.Router();

router.get('/:userId', ordersController.findAll);
router.post('/:userId', ordersController.create);
router.delete('/:userId', ordersController.delete);

export default router;
