import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <>
      <h2>Ez az admin oldal!</h2>
      <Link to="/admin/users">Felhasználók</Link>
      <Link to="/admin/products">Termékek</Link>
      <Link to="/admin/addProduct">Új termék</Link>
      <Outlet />
    </>
  );
}
