import { useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import userService from '../services/user-service';
import { UserContext } from '../contexts/UserContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div>
        <Link to="/">Kezdőoldal</Link>
      </div>
      <div>
        <form>
          <input
            type="text"
            placeholder="E-mail cím"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit" onClick={login}>
            Bejelentkezés
          </button>
        </form>
      </div>
    </>
  );

  function login(e) {
    e.preventDefault();
    userService.login(formData).then((resp) => {
      const decoded = jwt_decode(resp.data.accessToken);
      setUser(decoded);
    });
  }
}
