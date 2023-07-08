import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../utils/httpError';
import usersModel from '../database/models/users-model';

export default {
    register({email, password}) {
        if (!email || !password) throw new HttpError('Missing email or password', 400);
        if (password.length < 6) throw new HttpError('Password must be at least 6 characters', 400);

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        return usersModel.create({ email, passwordHash });
    }
}