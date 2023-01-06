import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ForgotPassword from './pages/forgotPassword';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
