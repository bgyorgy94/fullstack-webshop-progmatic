import { Users } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HttpError from '../utils/httpError';
import { JWT_SECRET_KEY } from '../constants';

export default {
  async register({ email, password }) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = await Users.create({ email, passwordHash });
    return user.toJSON();
  },

  async login({ email, password }) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new HttpError('Invalid email or password', 400);
    }
    const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!isValidPassword) {
      throw new HttpError('Invalid email or password', 400);
    }
    const token = jwt.sign(user.toJSON(), JWT_SECRET_KEY, { expiresIn: '24h' });
    return { accessToken: token };
  },
};
