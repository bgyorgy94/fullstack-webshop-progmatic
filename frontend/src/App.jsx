import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './pages/Categories';
import Category from './components/Category';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import { UserProvider } from './contexts/UserContext';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';

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
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/users',
        element: <UserList />
      }
    ]
  }
]);

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
