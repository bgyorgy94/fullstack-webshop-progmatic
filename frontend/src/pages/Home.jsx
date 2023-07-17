import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function Home() {
  const [user] = useContext(UserContext);

  return (
    <>
      <p>Ez lesz a kezdőoldal!</p>
      {user ? <p>Bejelentkezett felhasználó: {user.email}</p> : ''}
      <br />
      <br />
      <Link to="/register">Regisztráció</Link>
      <br />
      <br />
      <Link to="/login">Bejelentkezés</Link>
      <br />
      <br />
      <Link to='/cart'>Kosaram</Link>
      <br />
      <br />
      <Link to='/admin'>Admin oldal</Link>
    </>
  );
}
