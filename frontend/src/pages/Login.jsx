import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {login} = useLogin();
  
  function clickLogin(e) {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <div>
        <Link to="/">Kezdőoldal</Link>
      </div>
      <div>
        <form onSubmit={clickLogin}>
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
          <button type="submit">
            Bejelentkezés
          </button>
        </form>
      </div>
    </>
  );
}
