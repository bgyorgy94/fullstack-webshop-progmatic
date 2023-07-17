import express from 'express';
import categoriesRouter from './categories-route';
import productsRouter from './products-route';
import usersRouter from './users-route';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use(productsRouter);
router.use(usersRouter);

export default router;
