import express from 'express';
import authController from '../controllers/auth-controller';
import dataValidator from '../middlewares/data-validator-middleware';
import { authSchema } from '../validation-schemas';

const router = express.Router();

router.post('/register', dataValidator(authSchema), authController.register);
router.post('/login', dataValidator(authSchema), authController.login);

export default router;
