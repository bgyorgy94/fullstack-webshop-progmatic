import express from 'express';
import productsRouter from './products-route';

const router = express.Router();

router.use(productsRouter);
export default router;
