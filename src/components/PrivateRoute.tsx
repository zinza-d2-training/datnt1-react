import { Navigate, Outlet } from 'react-router-dom';

import useAccessToken from 'hooks/useAccessToken';

const PrivateRoute = () => {
  const isLogin = useAccessToken();

  return isLogin === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
