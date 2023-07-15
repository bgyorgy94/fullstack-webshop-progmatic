import express from 'express';
import categoriesRouter from './categories-route';
import productsRouter from './products-route';
import usersRouter from './users-route';
import cartRouter from './cart-route';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use(productsRouter);
router.use('/users', usersRouter);
router.use('/cart', cartRouter);

export default router;
