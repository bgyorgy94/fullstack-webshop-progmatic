import express from 'express';
import usersController from '../controllers/users-controller';

const router = express.Router();

router.get('/users/:id', usersController.find);
router.patch('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

export default router;