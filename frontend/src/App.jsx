import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './pages/RegisterUser';
import Home from './pages/Home';
import './App.css';
import Login from './pages/Login';
import { UserContext } from './contexts/UserContext';

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
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
