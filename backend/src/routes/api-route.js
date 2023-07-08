import express from 'express';
import categoriesRouter from './categories-route';
import productsRouter from './products-route';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use(productsRouter);

export default router;
