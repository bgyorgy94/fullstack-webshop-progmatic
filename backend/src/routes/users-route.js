import express from 'express';
import usersController from '../controllers/users-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.get('/', userVerify, usersController.getAll);
router.get('/:id', userVerify, usersController.find);
router.patch('/:id', userVerify, usersController.update);
router.delete('/:id', userVerify, usersController.delete);

export default router;
