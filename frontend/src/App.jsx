import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Category from './components/Category';
import Categories from './pages/Categories';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import Login from './pages/Login';
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
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
