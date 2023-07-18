import usersService from '../services/users-service';
import HttpError from '../utils/httpError';

export default {
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
};
