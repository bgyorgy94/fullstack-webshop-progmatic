import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categories from './pages/Categories';
import Category from './components/Category';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';
import UserList from './pages/UserList';
import Admin from './pages/Admin';
import { UserProvider } from './contexts/UserContext';
import './App.css';

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
