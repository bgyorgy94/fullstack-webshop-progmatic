import express from 'express';
import usersController from '../controllers/users-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.get('/', userVerify, usersController.getAll);

export default router;