import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Login from './Login';
import { LoginModalContext } from '../contexts/LoginModalContext';
import { RegisterModalContext } from '../contexts/RegisterModalContext';
import RegisterUser from './RegisterUser';

export default function Home() {
  const [user] = useContext(UserContext);
  const [loginModalIsOpen,setLoginModalIsOpen] = useContext(LoginModalContext);
  const [registerModalIsOpen,setRegisterModalIsOpen] = useContext(RegisterModalContext);
  return (
    <>
      <p>Ez lesz a kezdőoldal!</p>
      {user ? <p>Bejelentkezett felhasználó: {user.email}</p> : ''}
      <br />
      <button 
        type="button" 
        className="btn btn-primary" 
        onClick={loginButton}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        > 
      Bejelentkezés
      </button>
      <br />
      <br />
      <Link to="/cart">Kosaram</Link>
      <br />
      <br />
      <Link to="/admin">Admin oldal</Link>

      {loginModalIsOpen && <Login/>}
      {registerModalIsOpen && <RegisterUser/>}
    </>
  );
  function loginButton() {
    setLoginModalIsOpen(true);
  }
}
