import express from 'express';
import productsController from '../controllers/products-controller';
import { productSchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.find);
router.post('/', dataValidator(productSchema), productsController.create);
router.put('/:id', dataValidator(productSchema), productsController.update);
router.delete('/:id', productsController.delete);

export default router;
