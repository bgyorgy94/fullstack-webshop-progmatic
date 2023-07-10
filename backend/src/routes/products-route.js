import express from 'express';
import productsController from '../controllers/products-controller';

const router = express.Router();

router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.find);
router.post('/products', productsController.create);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.delete);

export default router;
