import express from 'express';
import productsController from '../controllers/products-controller';

const router = express.Router();

router.get('/products', productsController.findAll);
router.post('/products', productsController.create);
export default router;
