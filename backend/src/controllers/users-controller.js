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
    const { email, passwordHash, isAdmin, address } = req.body;

    // isAdmin -> admin oldali opcio
    // passwordHash -> nem szabad modositani
    // (kulon endpointba, pl. /api/users/:id/password, adott user pw-jet lehet modositani - regi + uj pw)
    // EXTRA - elfelejtett jelszo - admin oldalrol kuldjuk el a jelszogeneralo linket a usernek

    if (req.body.userData.isAdmin || req.body.userData.id === id) {
      try {
        const user = await usersService.update({
          id,
          email,
          passwordHash,
          isAdmin,
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
      const { limit, offset } = req.query;
      try {
        const users = await usersService.getAll(limit, offset);
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
