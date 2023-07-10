import authService from '../services/auth-service';

export default {
  register(req, res, next) {
    const { email, password } = req.body;
    authService
      .register({ email, password })
      .then(() => {
        res.json({ message: 'Sikeres regisztráció!' });
      })
      .catch((err) => next(err));
  },

  login(req, res, next) {
    const { email, password } = req.body;
    authService
      .login({ email, password })
      .then(({ accessToken }) => {
        res.send({ accessToken });
      })
      .catch((err) => next(err));
  },
};
