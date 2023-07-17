import usersService from "../services/users-service";
import HttpError from "../utils/httpError";
import jwtDecode from 'jwt-decode';


export default {

    find(req, res, next) {
        const { id } = req.params;
        const decoded = jwtDecode(req.headers.authorization);
        usersService
        .find( {id} )
        .then( (user) => {
            if( decoded.isAdmin ||  user.id === decoded.id){
                res.setHeader('authorization', req.headers.authorization);
                res.status(200).send(user);
            }else{
                res.sendStatus(403);
            }
        })
        .catch(next);
    },

    update(req, res, next) {
        const { id } = req.params;
        const { email, password_hash, is_admin, address } = req.body;
        if(req.body.userData.isAdmin || req.body.userData.id === id){
            usersService
            .update({ id, email, password_hash, is_admin, address })
            .then( (user) => {
                    res.setHeader('authorization',`Bearer ${req.body.userData.token}`);
                    res.status(200).send(user);
            })
            .catch(next);
        }else{
            res.sendStatus(403);
        }
    },

    delete(req, res, next) {
        const { id } = req.params;
        const decoded = jwtDecode(req.headers.authorization);
        if(decoded.isAdmin || id === decoded.id){
            usersService
            .delete({ id })
            .then((user) => {
                res.setHeader('authorization',`Bearer ${req.headers.authorization}`);
                res.sendStatus(200) 
            })
            .catch(next); 
        }else{
            res.sendStatus(403);
        }
    }
};