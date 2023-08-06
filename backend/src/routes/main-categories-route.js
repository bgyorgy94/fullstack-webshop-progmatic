import express from 'express';
import mainCategoriesController from '../controllers/main-categories-controller';
import { categorySchema } from '../validation-schemas';
import dataValidator from '../middlewares/data-validator-middleware';

const router = express.Router();

router.get('/', mainCategoriesController.findAll);
router.get('/:id', mainCategoriesController.findById);
router.post('/', dataValidator(categorySchema), mainCategoriesController.create);
router.put('/:id', dataValidator(categorySchema), mainCategoriesController.update);
router.delete('/:id', mainCategoriesController.delete);

export default router;
