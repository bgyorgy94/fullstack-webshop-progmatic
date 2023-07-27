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
import './style.scss';
import { LoginModalProvider } from './contexts/LoginModalContext';
import { RegisterModalProvider } from './contexts/RegisterModalContext';

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
      <LoginModalProvider>
        <RegisterModalProvider>
        <RouterProvider router={router} />
      </RegisterModalProvider>
      </LoginModalProvider>
    </UserProvider>
  );
}

export default App;
