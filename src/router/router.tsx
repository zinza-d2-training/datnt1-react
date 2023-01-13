import { createBrowserRouter } from 'react-router-dom';

import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import LoginLayout from 'layout/LoginLayout';
import InjectionRegistrationStep1 from 'pages/InjectionRegistrationStep1';
import InjectionRegistrationStep2 from 'pages/InjectionRegistrationStep2';
import InjectionRegistrationStep3 from 'pages/InjectionRegistrationStep3';
import VaccinationCertificate from 'pages/VaccinationCertificate';
import RegistrationResult from 'pages/RegistrationResult';
import Account from 'pages/Account';

console.log('fix vercel');

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
