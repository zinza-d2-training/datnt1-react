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
import MainLayout from 'layout/MainLayout';
import AdminPlace from 'pages/AdminPlace';

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
    path: '/',
    element: <MainLayout />,
    children: [
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
        path: '/user/vaccination-certificate',
        element: <VaccinationCertificate />
      },
      {
        path: '/user/registration-result',
        element: <RegistrationResult />
      },
      {
        path: '/user/account',
        element: <Account />
      },
      {
        path: '/admin/injection-point',
        element: <AdminPlace />
      },
      {
        path: '/admin/registration',
        element: <AdminPlace />
      },
      {
        path: '/admin/doccument',
        element: <AdminPlace />
      }
    ]
  }
]);

export default router;
