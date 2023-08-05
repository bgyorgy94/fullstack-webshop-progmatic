import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import userService from '../../services/user-service';
import useLogin from '../../hooks/useLogin';

export default function AuthModal({ show, handleClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { login } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    userService.register(formData).then((resp) => setMessage(resp.data.message));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '' });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <span className="text-primary" onClick={toggleForm} style={{ cursor: 'pointer' }}>
          {isLogin ? 'New User? Register' : 'Already have an account? Login'}
        </span>
      </Modal.Footer>
    </Modal>
  );
}
