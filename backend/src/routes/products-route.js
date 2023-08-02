import express from 'express';
import productsController from '../controllers/products-controller';
import { productSchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';
import uploadImg from '../middlewares/upload-img-middleware';

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.find);
router.post('/', uploadImg('productImg'), dataValidator(productSchema), productsController.create);
router.put(
  '/:id',
  uploadImg('productImg'),
  dataValidator(productSchema),
  productsController.update,
);
router.delete('/:id', productsController.delete);

export default router;
