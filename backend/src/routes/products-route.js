import express from 'express';
import productsController from '../controllers/products-controller';
import { productSchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';

const router = express.Router();

router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.find);
router.post('/products', dataValidator(productSchema), productsController.create);
router.put('/products/:id', dataValidator(productSchema), productsController.update);
router.delete('/products/:id', productsController.delete);

export default router;
