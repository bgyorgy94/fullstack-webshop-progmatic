import { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/user-service';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  function register(e) {
    e.preventDefault();
    userService.register(formData).then((resp) => setMessage(resp.data.message));
  }

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
          <button type="submit" onClick={register}>
            Regisztráció
          </button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
}