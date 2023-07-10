import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../utils/httpError';
import usersModel from '../database/models/users-model';
import { JWT_SECRET_KEY } from '../constants';

export default {
  register({ email, password }) {
    if (!email || !password) throw new HttpError('Missing email or password', 400);
    if (password.length < 6) throw new HttpError('Password must be at least 6 characters', 400);

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    return usersModel.create({ email, passwordHash });
  },

  login({ email, password }) {
    if (!email || !password) throw new HttpError('Missing email or password', 400);

    return usersModel.getByEmail(email).then((userPWHash) => {
      const { passwordHash, ...user } = userPWHash;
      const isValidPassword = bcrypt.compareSync(password, passwordHash);
      if (!isValidPassword) throw new HttpError('Invalid email or password', 400);
      const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '24h' });
      return { accessToken: token };
    });
  },
};
