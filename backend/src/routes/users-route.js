import express from 'express';
import usersController from '../controllers/users-controller';
import userVerify from '../middlewares/user-verify-middleware';

const router = express.Router();

router.use(userVerify);

router.get('/', usersController.getAll);
router.get('/:id', usersController.find);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.delete);

export default router;
