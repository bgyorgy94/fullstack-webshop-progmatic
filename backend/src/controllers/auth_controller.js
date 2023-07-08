import authService from '../services/auth_service';

export default {
    register(req, res, next) {
        const {email, password} = req.body;
        authService.register({email, password})
        .then(() => {
            res.send('Sikeres regisztráció!');
        })
        .catch((err) => next(err))
    },
}