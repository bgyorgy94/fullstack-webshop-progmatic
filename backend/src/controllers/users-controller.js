import jwtDecode from 'jwt-decode';
import usersService from '../services/users-service';
import HttpError from '../utils/httpError';

export default {
  async find(req, res, next) {
    const { id } = req.params;
    const decoded = jwtDecode(req.headers.authorization);
    try {
      const user = await usersService.find({ id });
      if (decoded.isAdmin || user.id === decoded.id) {
        res.setHeader('authorization', req.headers.authorization);
        res.status(200).send(user);
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { email, password_hash, is_admin, address } = req.body;
    if (req.body.userData.isAdmin || req.body.userData.id === id) {
      try {
        const user = await usersService.update({
          id,
          email,
          password_hash,
          is_admin,
          address,
        });
        res.send(user);
      } catch (err) {
        next(err);
      }
    } else {
      res.sendStatus(403);
    }
  },

  async getAll(req, res, next) {
    if (req.user.isAdmin === 1) {
      try {
        const users = await usersService.getAll();
        res.send(users);
      } catch (err) {
        next(err);
      }
    } else {
      next(new HttpError('Unauthenticated', 401));
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;
    const decoded = jwtDecode(req.headers.authorization);
    if (decoded.isAdmin || id === decoded.id) {
      try {
        const user = await usersService.delete({ id });
        res.send(user);
      } catch (err) {
        next(err);
      }
    } else {
      res.sendStatus(403);
    }
  },
};
