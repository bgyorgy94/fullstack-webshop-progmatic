import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Navbar from '../components/Navbar';

export default function Home() {
  const [user] = useContext(UserContext);
  return (
    <>
      <Navbar />
      <p>Ez lesz a kezdőoldal!</p>
      {user ? <p>Bejelentkezett felhasználó: {user.email}</p> : ''} 

    </>
  );

}
