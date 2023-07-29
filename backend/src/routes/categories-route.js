import express from 'express';
import categoriesController from '../controllers/categories-controller';
import { categorySchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';

const router = express.Router();

router.get('/', categoriesController.findAll);
router.get('/:id', categoriesController.findById);
router.post('/', dataValidator(categorySchema), categoriesController.create);
router.put('/:id', dataValidator(categorySchema), categoriesController.update);
router.delete('/:id', categoriesController.delete);

export default router;
