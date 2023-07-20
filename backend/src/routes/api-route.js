import express from 'express';
import categoriesRouter from './categories-route';
import productsRouter from './products-route';
import usersRouter from './users-route';
import userOrdersRouter from './user-orders-route';
import cartRouter from './cart-route';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', userOrdersRouter);
router.use('/carts/items', cartRouter);

export default router;
