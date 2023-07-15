import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import Home from './components/Home';
import Categories from './pages/Categories';
import Category from './components/Category';
import './App.css';
import Login from './pages/Login';
import { UserProvider } from './contexts/UserContext';

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
