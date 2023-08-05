import { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import userService from '../services/user-service';
import { UserContext } from '../contexts/UserContext';

export default function useLogin() {
  const [user, setUser] = useContext(UserContext);

  function login(loginData) {
    userService.login(loginData).then((resp) => {
      const decoded = jwtDecode(resp.data.accessToken);
      setUser((prev) => ({ ...prev, ...decoded }));
      localStorage.setItem('access_token', resp.data.accessToken);
    });
  }

  function logout() {
    setUser({});
    localStorage.removeItem('access_token');
  }

  return { login, logout };
}
