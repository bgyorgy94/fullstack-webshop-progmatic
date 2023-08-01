import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <>
      <h2>Admin</h2>
      <div className="text-center my-3">
        <Link className="admin-link" to="/admin/users">
          FELHASZNÁLÓK
        </Link>
        <Link className="admin-link" to="/admin/products">
          TERMÉKEK
        </Link>
        <Link className="admin-link" to="/admin/addProduct">
          ÚJ TERMÉK
        </Link>
      </div>
      <Outlet />
    </>
  );
}
