import { createBrowserRouter } from 'react-router-dom';

import ForgotPassword from 'pages/forgotPassword';
import Home from 'pages/home';
import Login from 'pages/login';
import Register from 'pages/register';
import LoginLayout from 'layout/LoginLayout';
import InjectionRegistrationStep1 from 'pages/InjectionRegistrationStep1';
import InjectionRegistrationStep2 from 'pages/InjectionRegistrationStep2';
import InjectionRegistrationStep3 from 'pages/InjectionRegistrationStep3';
import VaccinationCertificate from 'pages/VaccinationCertificate';
import RegistrationResult from 'pages/RegistrationResult';
import Account from 'pages/Account';

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
  },
  {
    path: '/injection-registration/step2',
    element: <InjectionRegistrationStep2 />
  },
  {
    path: '/injection-registration/step3',
    element: <InjectionRegistrationStep3 />
  },
  {
    path: '/vaccination-certificate',
    element: <VaccinationCertificate />
  },
  {
    path: '/registration-result',
    element: <RegistrationResult />
  },
  {
    path: '/account',
    element: <Account />
  }
]);

export default router;
