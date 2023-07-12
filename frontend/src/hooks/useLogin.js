import { useContext, useState } from 'react';
import userService from '../services/user-service';
import jwt_decode from 'jwt-decode';
import { UserContext } from '../contexts/UserContext';

export default function useLogin() {
    const [user, setUser] = useContext(UserContext);

    function login(loginData) {
        userService.login(loginData).then((resp) => {
            const decoded = jwt_decode(resp.data.accessToken);
            setUser(decoded);
        });
    };

    return {login};

}