import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterUser />
  },
  {
    path: '/',
    element: <Home />
  }
]);

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
