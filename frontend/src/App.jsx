import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './components/Category';
import './App.css';
import Login from './pages/Login';
import { UserProvider } from './contexts/UserContext';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
import AdminProductList from './pages/AdminProductList/AdminProductList';
import AdminAddProduct from './pages/AdminAddProduct/AdminAddProduct';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterUser />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  { path: '/categories/:id', element: <Category /> },
  {
    path: '/login',
    element: <Login />,
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
        element: <AdminProductList />
      },
      {
        path: '/admin/addProduct',
        element: <AdminAddProduct />
      }
    ],
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
