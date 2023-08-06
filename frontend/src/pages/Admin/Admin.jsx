import { Link, Outlet } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  return (
    <>
      <h2>Admin</h2>
      <div className="text-center">
        <Link className="admin-link" to="/admin/orders" style={{ color: 'red' }}>
          ORDERS
        </Link>
        <Link className="admin-link" to="/admin/users" style={{ color: 'red' }}>
          USERS
        </Link>
        <Link className="admin-link" to="/admin/products">
          PRODUCTS
        </Link>
        <Link className="admin-link" to="/admin/addProduct">
          ADD PRODUCT
        </Link>
      </div>
      <Outlet />
    </>
  );
}
