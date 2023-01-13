import { createBrowserRouter } from 'react-router-dom';

import ForgotPassword from 'pages/forgotPassword';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import LoginLayout from 'layout/LoginLayout';
import InjectionRegistrationStep1 from 'pages/InjectionRegistrationStep1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '/injection-registration/step1',
    element: <InjectionRegistrationStep1 />
  }
]);

export default router;
