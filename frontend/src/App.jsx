import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import Home from './components/Home';
import Categories from './components/Categories';
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
