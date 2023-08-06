import express from 'express';
import subCategoriesController from '../controllers/sub-categories-controller';
import { categorySchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';

const router = express.Router();

router.get('/', subCategoriesController.findAll);
router.get('/:id', subCategoriesController.findById);
router.post('/', dataValidator(categorySchema), subCategoriesController.create);
router.put('/:id', dataValidator(categorySchema), subCategoriesController.update);
router.delete('/:id', subCategoriesController.delete);

export default router;
