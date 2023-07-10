import express from 'express';
import categoriesController from '../controllers/categories-controller';

const router = express.Router();

router.get('/', categoriesController.findAll);
router.get('/:id', categoriesController.findById);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;
