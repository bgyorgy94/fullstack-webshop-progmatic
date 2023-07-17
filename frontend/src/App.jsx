import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './pages/Categories';
import Category from './components/Category';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
// import AdminOrders from './pages/AdminOrders';
// import AdminOrder from './components/AdminOrder';
import UserOrders from './pages/UserOrders';
// import UserOrder from './components/UserOrder';
import { UserProvider } from './contexts/UserContext';
import './App.css';

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
    path: '/categories',
    element: <Categories />,
    children: [{ path: '/categories/:categoryId', element: <Category /> }],
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/users',
        element: <UserList />,
      },
      /* {
        path: '/admin/orders',
        element: <AdminOrders />,
        children: [{ path: '/admin/orders/:orderId', element: <AdminOrder /> }],
      }, */
    ],
  },
  {
    path: '/orders',
    element: <UserOrders />,
    children: [{ path: 'orders/:orderId' /* element: <UserOrder /> */ }],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
