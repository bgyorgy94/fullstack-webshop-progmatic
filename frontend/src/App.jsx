import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './pages/Categories';
import Category from './components/Category';
import RegisterUser from './pages/LoginRegister/RegisterUser';
import Home from './pages/Home';
import './App.scss';
import Login from './pages/LoginRegister/Login';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart/Cart';
// import AdminOrderList from './pages/AdminOrderList';
// import AdminOrder from './components/AdminOrder';
import UserOrders from './pages/UserOrders';
import UserOrder from './components/UserOrder';
import { UserProvider } from './contexts/UserContext';
import { LoginModalProvider } from './contexts/LoginModalContext';
import { RegisterModalProvider } from './contexts/RegisterModalContext';
import AdminProductList from './pages/AdminProductList/AdminProductList';
import AdminAddProduct from './pages/AdminAddProduct/AdminAddProduct';
import AdminModifyProduct from './pages/AdminModifyProduct/AdminModifyProduct';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <RegisterUser />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/categories',
    element: <Categories />,
    children: [{ path: ':categoryId', element: <Category /> }],
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/users',
        element: <UserList />,
      },
      {
        path: '/admin/products',
        element: <AdminProductList />,
      },
      {
        path: '/admin/addProduct',
        element: <AdminAddProduct />,
      },
      {
        path: '/admin/products/:id/modify',
        element: <AdminModifyProduct />,
      },
      /*
      {
        path: '/admin/orders',
        element:  <AdminOrderList /> 
        children: [
          { path: ':orderId', element: <AdminOrder /> }
        ],
      },
      */
    ],
  },
  {
    path: '/orders',
    children: [
      { index: true, element: <UserOrders /> },
      { path: ':orderId', element: <UserOrder /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <LoginModalProvider>
          <RegisterModalProvider>
            <RouterProvider router={router} />
          </RegisterModalProvider>
        </LoginModalProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
