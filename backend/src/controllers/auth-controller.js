import authService from '../services/auth-service';

export default {
  async register(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await authService.register({ email, password });
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await authService.login({ email, password });
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
};
