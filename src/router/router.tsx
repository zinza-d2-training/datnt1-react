import { createBrowserRouter } from 'react-router-dom';

import AdminPrivateRoute from 'components/AdminPrivateRoute';
import PrivateRoute from 'components/PrivateRoute';
import LoginLayout from 'layout/LoginLayout';
import MainLayout from 'layout/MainLayout';
import Account from 'pages/Account';
import AdminDocument from 'pages/AdminDocument';
import AdminPlace from 'pages/AdminPlace';
import AdminRegistration from 'pages/AdminRegistration';
import ConfirmResetPassword from 'pages/ConfirmResetPassword';
import ForgotPassword from 'pages/ForgotPassword';
import Home from 'pages/Home';
import InjectionRegistrationStep1 from 'pages/InjectionRegistrationStep1';
import InjectionRegistrationStep2 from 'pages/InjectionRegistrationStep2';
import InjectionRegistrationStep3 from 'pages/InjectionRegistrationStep3';
import Login from 'pages/Login';
import Register from 'pages/Register';
import RegistrationResult from 'pages/RegistrationResult';
import VaccinationCertificate from 'pages/VaccinationCertificate';

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
      },
      {
        path: '/confirm-reset-password',
        element: <ConfirmResetPassword />
      }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
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
          }
        ]
      },

      {
        path: '/',
        element: <AdminPrivateRoute />,
        children: [
          {
            path: '/admin/injection-point',
            element: <AdminPlace />
          },
          {
            path: '/admin/registration',
            element: <AdminRegistration />
          }
        ]
      },
      {
        path: '/admin/document',
        element: <AdminDocument />
      }
    ]
  }
]);

export default router;
