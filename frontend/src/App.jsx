import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
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
