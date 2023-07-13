import usersService from '../services/users-service'
import HttpError from '../utils/httpError'

export default {
    getAll(req, res, next) {
        if (req.user.isAdmin === 1) {
            usersService
                .getAll()
                .then(users => {
                    res.send(users)
                })
        } else {
            throw new HttpError('Unauthenticated', 401);
        }
    },
}