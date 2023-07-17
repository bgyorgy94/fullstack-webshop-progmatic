import express from 'express';
import productsController from '../controllers/products-controller';

const router = express.Router();

router.get('/', productsController.findAll);
router.get('/:id', productsController.find);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

export default router;
