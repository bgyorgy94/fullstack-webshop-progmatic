import express from 'express';
import categoriesRouter from './categories-route';
import productsRouter from './products-route';
import usersRouter from './users-route';
import ordersRouter from './orders-route';
import cartRouter from './cart-route';

const router = express.Router();

router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/carts', cartRouter);

export default router;
